import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get, NotFoundException,
  Post,
  UseGuards,
  UseInterceptors
} from "@nestjs/common";
import { OrderService } from "./order.service";
import { AuthGuard } from "../auth/auth.guard";
import { CreateOrderDto } from "./dtos/create-order.dto";
import { LinkService } from "../link/link.service";
import { Order } from "./order";
import { Link } from "../link/link";
import { ProductService } from "../product/product.service";
import { OrderItem } from "./order-item";
import { Product } from "../product/product";
import { OrderItemService } from "./order-item.service";
import { Connection } from "typeorm";
import { InjectStripe } from "nestjs-stripe";
import Stripe from "stripe";
import { ConfigService } from "@nestjs/config";
import { EventEmitter2 } from "@nestjs/event-emitter";

@Controller()
@UseInterceptors(ClassSerializerInterceptor)
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly orderItemService: OrderItemService,
    private readonly linkService: LinkService,
    private readonly productService: ProductService,
    private readonly connection: Connection,
    @InjectStripe() private readonly stripeClient: Stripe,
    private readonly configService: ConfigService,
    private readonly eventEmitter: EventEmitter2
  ) {
  }

  @UseGuards(AuthGuard)
  @Get('admin/orders')
  all() {
    return this.orderService.find({
      relations: ['order_items']
    });
  }

  @Post('checkout/orders')
  async create(@Body() body: CreateOrderDto) {
    const link: Link = await this.linkService.findOne({
      code: body.code,
      relations: ['user']
    });

    if (!link) throw new BadRequestException('Invalid link');

    const queryRunner = this.connection.createQueryRunner();

    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();

      const o = new Order();
      o.user_id = link.user.id;
      o.ambassador_email = link.user.email;
      o.first_name = body.first_name;
      o.last_name = body.last_name;
      o.email = body.email;
      o.address = body.address;
      o.country = body.country;
      o.city = body.city;
      o.zip = body.zip;
      o.code = body.code;

      const order = await queryRunner.manager.save(o);

      const line_items = [];

      for (let p of body.products) {
        const product: Product = await this.productService.findOne({
          id: p.product_id
        })

        const orderItem = new OrderItem();
        orderItem.order = order;
        orderItem.product_title = product.title;
        orderItem.price = product.price;
        orderItem.quantity = p.quantity;
        orderItem.ambassador_revenue = 0.1 * product.price * p.quantity;
        orderItem.admin_revenue = 0.9 * product.price * p.quantity;

        await queryRunner.manager.save(o);

        line_items.push({
          name: product.title,
          description: product.description,
          images: [
            product.image
          ],
          // in cents
          amount: 100 * product.price,
          currency: 'usd',
          quantity: p.quantity
        })
      }

      const source = await this.stripeClient.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items,
        success_url: `${this.configService.get('CHECKOUT_URL')}/success?source={CHECKOUT_SESSION_ID}`,
        cancel_url: `${this.configService.get('CHECKOUT_URL')}/error`
      })

      order.transaction_id = source.id;
      await queryRunner.manager.save(o);

      await queryRunner.commitTransaction();

      return source;
    } catch (e) {
      await queryRunner.rollbackTransaction();

      throw new BadRequestException(e);
    } finally {
      await queryRunner.release();
    }
  }

  @Post('checkout/orders/confirm')
  async confirm(@Body('source') source: string) {
    const order = await this.orderService.findOne({
      where: {transaction_id: source},
      relations: ['order_items', 'user']
    })

    if (!order) throw new NotFoundException('Order not found');

    await this.orderService.update(order.id, {
      complete: true
    });

    await this.eventEmitter.emitAsync('order.completed', order);

    return {
      message: 'success'
    }
  }
}

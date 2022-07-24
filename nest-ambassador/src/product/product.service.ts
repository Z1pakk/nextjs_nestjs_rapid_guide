import { Injectable } from "@nestjs/common";
import { AbstractService } from "../shared/abstract.service";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Product } from "./product";

@Injectable()
export class ProductService extends AbstractService{
  constructor(
    @InjectRepository(Product) private readonly productRepository: Repository<Product>
  ) {
    super(productRepository);
  }
}

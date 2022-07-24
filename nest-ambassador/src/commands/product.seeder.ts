import { NestFactory } from "@nestjs/core";
import { AppModule } from "../app.module";
import faker from "@faker-js/faker";
import { ProductService } from "../product/product.service";
import { Product } from "../product/product";
import { randomInt } from "crypto";


// docker-compose exec backend sh
// npm run seed:products
(async () => {
  const app = await NestFactory.createApplicationContext(AppModule);

  const productService = app.get(ProductService);

  for(let i = 0; i < 30; i++) {
    await productService.save(<Product>{
      title: faker.lorem.words(2),
      description: faker.lorem.words(10),
      image: faker.image.imageUrl(200, 200, '', true),
      price: randomInt(10, 100)
    })
  }

  process.exit();
})();

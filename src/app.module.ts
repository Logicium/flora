import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {OrderController} from "./controllers/order.controller";
import {PaymentController} from "./controllers/payment.controller";
import {ProductController} from "./controllers/product.controller";
import {OrderService} from "./services/order.service";
import {PaymentService} from "./services/payment.service";
import {ProductService} from "./services/product.service";
import {MikroOrmModule} from "@mikro-orm/nestjs";

@Module({
  imports: [
    MikroOrmModule.forRoot(),
  ],
  controllers: [AppController,OrderController,PaymentController,ProductController],
  providers: [AppService,OrderService,PaymentService,ProductService],
})

export class AppModule {}

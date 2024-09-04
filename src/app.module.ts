import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {OrderController} from "./order/order.controller";
import {PaymentController} from "./payment/payment.controller";
import {ProductController} from "./product/product.controller";
import {OrderService} from "./order/order.service";
import {PaymentService} from "./payment/payment.service";
import {ProductService} from "./product/product.service";
import {MikroOrmModule} from "@mikro-orm/nestjs";
import {SqliteDriver} from "@mikro-orm/sqlite";

@Module({
  imports: [
    MikroOrmModule.forRoot(),
  ],
  controllers: [AppController,OrderController,PaymentController,ProductController],
  providers: [AppService,OrderService,PaymentService,ProductService],
})

export class AppModule {}

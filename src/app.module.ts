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
import { MailerModule } from '@nestjs-modules/mailer';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import {EmailController} from "./controllers/email.controller";
import {EmailService} from "./services/email.service";
import secrets from "../app.secret";
import {AuthController} from "./controllers/auth.controller";
import {AuthService} from "./services/auth.service";
import {UserService} from "./services/user.service";
import {JwtService} from "@nestjs/jwt";
import {UserController} from "./controllers/user.controller";

@Module({
  imports: [
    MikroOrmModule.forRoot(),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.mailgun.org',
        port: Number(587),
        secure: false,
        auth: secrets.email.auth,
      },
      defaults: {
        from: '"FLORA SHOP" <postmaster@sandboxa845deaa192b498884545cae79d50c52.mailgun.org>',
      },
      template: {
        dir: './templates',
        adapter: new EjsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  controllers: [AppController,OrderController,PaymentController,ProductController,EmailController,AuthController,UserController],
  providers: [AppService,OrderService,PaymentService,ProductService,EmailService,AuthService,UserService,JwtService],
})

export class AppModule {}

import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { ProductService } from './product.service';
import { PaymentService } from './payment.service';
import {CreateOrderDto} from "../dto/create-order.dto";
import {MikroORM} from "@mikro-orm/core";
import {EntityManager} from "@mikro-orm/mysql";
import {UserService} from "./user.service";
import {User} from "../entities/user.entity";
import {Order} from "../entities/order.entity";
import {Stripe} from "stripe";
import {Product} from "../entities/product.entity";


@Injectable()
export class OrderService {
    constructor(
        @Inject(ProductService) private readonly productService: ProductService,
        private readonly orm: MikroORM,
        private readonly em: EntityManager,
        private userService: UserService,
    ) {}

    async createOrder(email:string,total:number,productList) {

        const user = await this.userService.getUserByEmail(email);

        // const order = await this.em.create(Order,{
        //     user: user,
        //     total:total,
        // });

        const order = new Order();
        order.user = user;
        order.total = total;
        order.createdOn = new Date();
        await this.em.persist(order).flush();
        const newOrder = await this.em.findOne(Order,order)
        await newOrder.products.init();

        for (const product of productList) {
            const productEntity = await this.em.findOne(Product,{priceId:product.price.id});
            newOrder.products.add(productEntity);
        }

        await this.em.flush();


    }

    async getAllOrders(){
        const orders = await this.em.find(Order,{},{ populate: ['products'] } );
        return orders;
    }
}
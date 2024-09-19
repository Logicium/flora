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
        const order = new Order();
        order.user = user;
        order.total = total;
        order.createdOn = new Date();
        for (const product of productList) {
            const productEntity = await this.em.findOne(Product,{priceId:product.price.id});
            order.products.add(productEntity);
        }
        await this.em.persist(order).flush();
    }

    async getAllOrders(){
        const orders = await this.em.find(Order,{},{ populate: ['products'] } );
        return orders;
    }

    async getUserOrders(user){
        const orders = await this.em.find(Order,{user:user.id},{ populate: ['products'] } );
        return orders;
    }
}
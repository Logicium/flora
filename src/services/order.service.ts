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

    async createOrder(email:string,total:number,productList,event) {

        const user = await this.userService.getUserByEmail(email);
        const order = new Order();
        order.user = user;
        order.total = total;
        order.shippingCost = event.shipping_cost.amount_total;
        order.shippingInfo = event.shipping_details;
        order.shippingMethod = event.shipping_options;
        order.lineItems = productList;
        order.sessionId = event.id;
        for (const product of productList) {
            const productEntity = await this.em.findOne(Product,{priceId:product.price.id});
            order.products.add(productEntity);
        }
        await this.em.persist(order).flush();
    }

    async getOrder(id:number){
        const order = await this.em.findOne(Order,{id:id},{ populate: ['products'] });
        return order;
    }

    async getAllOrders(){
        const orders = await this.em.find(Order,{},{ populate: ['products'] } );
        return orders;
    }

    async getUserOrders(user){
        const orders = await this.em.find(Order,{user:user.id},{ populate: ['products'] } );
        return orders;
    }

    async createOrderByCharge(paymentId: string, billingInfo, paymentInfo:{}, receiptUrl: string) {
        const order = new Order();
        order.paymentId = paymentId;
        order.createdOn = new Date();
        order.billingInfo = billingInfo;
        order.paymentMethod = paymentInfo;
        order.receiptUrl = receiptUrl;

        await this.em.persist(order).flush();

    }

    async updateOrderByCharge(paymentId: string, email: string, total: number, lineItems:Array<Stripe.LineItem>, event: Stripe.Checkout.Session) {
        const user = await this.userService.getUserByEmail(email);
        const order = await this.em.findOne(Order,{paymentId:paymentId});
        order.user = user;
        order.total = total;
        order.subtotal = event.amount_subtotal;
        order.tax = event.total_details.amount_tax;
        order.shippingCost = event.shipping_cost.amount_total;
        order.shippingInfo = event.shipping_details;
        order.shippingMethod = event.shipping_options;
        order.lineItems = lineItems;
        order.sessionId = event.id;
        for (const product of lineItems) {
            const productEntity = await this.em.findOne(Product,{priceId:product.price.id});
            order.products.add(productEntity);
        }
        await this.em.flush();
    }
}
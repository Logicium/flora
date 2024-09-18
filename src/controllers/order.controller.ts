import {Controller, Post, Body, Get, Param, Query} from '@nestjs/common';
import { OrderService } from '../services/order.service';
import { CreateOrderDto } from '../dto/create-order.dto';
import Stripe from 'stripe';
import secrets from "../../app.secret"; // TypeScript compatible import

@Controller('order')
export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    @Post()
    async createOrder(@Body() createOrderDto:
                          CreateOrderDto) {
        return this.orderService.createOrder(createOrderDto);
    }

    @Get('/session-status')
    async sessionStatus(@Query('session_id') sessionId){
        const stripe = new Stripe(secrets.stripe.secret, {apiVersion: '2024-06-20'});
        const session = await stripe.checkout.sessions.retrieve(sessionId);

        return {
            status: session.status,
            customer_email: session.customer_details.email
        };
    }

    @Post('/create-checkout-session')
    async checkout(@Body() createCheckout){
        const stripe = new Stripe(secrets.stripe.secret, {apiVersion: '2024-06-20'}); // Using new keyword because Stripe is a class
        const session = await stripe.checkout.sessions.create({
            ui_mode: 'embedded',
            line_items: [
                {
                    // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                    price: 'price_1PzoGP06xeklz4Gn7wd5DB4w',
                    quantity: 1,
                },
            ],
            mode: 'payment',
            shipping_address_collection:{
                allowed_countries:["US","CA","MX"]
            },
            shipping_options: [
                {
                    shipping_rate_data: {
                        type: 'fixed_amount',
                        fixed_amount: {
                            amount: 600,
                            currency: 'usd',
                        },
                        display_name: 'USPS First Class Mail',
                        delivery_estimate: {
                            minimum: {
                                unit: 'business_day',
                                value: 2,
                            },
                            maximum: {
                                unit: 'business_day',
                                value: 5,
                            },
                        },
                    },
                },
            ],
            return_url: `http://localhost:5173/confirmation?session_id={CHECKOUT_SESSION_ID}`,
        });

        return {clientSecret: session.client_secret};
    }
}
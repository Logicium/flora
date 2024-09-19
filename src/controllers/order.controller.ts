import {Controller, Headers, Post, Body, Get, Param, Query, Req, RawBodyRequest} from '@nestjs/common';
import { OrderService } from '../services/order.service';
import { CreateOrderDto } from '../dto/create-order.dto';
import Stripe from 'stripe';
import secrets from "../../app.secret"; // TypeScript compatible import

@Controller('order')
export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    @Get('/list')
    async createOrder() {
        return this.orderService.getAllOrders();
    }

    @Post('/webhook')
    async webhook(@Headers('stripe-signature') signature: string, @Req() req: RawBodyRequest<Request>) {
        const stripe = new Stripe(secrets.stripe.secret, {apiVersion: '2024-06-20'});
        const payload = req.rawBody;
        const event = await stripe.webhooks.constructEvent(
            payload,
            signature,
            secrets.stripe.webhook
        );
        // console.log(event.type,event.data);

        if(event.type === 'checkout.session.completed' ){
            console.log('Checkout Complete');

            const sessionId = event.data.object.id;
            const total = event.data.object.amount_total;
            const email = event.data.object.customer_details.email;
            console.log(sessionId,total,email);
            const lineItems = await stripe.checkout.sessions.listLineItems(sessionId);
            console.log(lineItems);

            this.orderService.createOrder(email, total, lineItems.data);
        }
        return {received: true}
    }

    @Get('/session-status')
    async sessionStatus(@Query('session_id') sessionId){
        const stripe = new Stripe(secrets.stripe.secret, {apiVersion: '2024-06-20'});
        const session = await stripe.checkout.sessions.retrieve(sessionId);
        console.log(session);
        return {
            status: session.status,
            customer_email: session.customer_details.email,
            line_items: session.line_items
        };
    }

    @Post('/create-checkout-session')
    async checkout(@Body() createCheckout:any){
        const stripe = new Stripe(secrets.stripe.secret, {apiVersion: '2024-06-20'}); // Using new keyword because Stripe is a class
        const lineItems = [];
        console.log(createCheckout);
        for(let i=0;i<createCheckout.length;i++){
            let lineItem = {
                price: createCheckout[i].priceId,
                quantity: createCheckout[i].quantity
            };
            lineItems.push(lineItem);
        }

        const session = await stripe.checkout.sessions.create({
            ui_mode: 'embedded',
            line_items: lineItems,
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
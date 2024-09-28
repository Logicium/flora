import {Controller, Headers, Post, Body, Get, Param, Query, Req, RawBodyRequest, UseGuards} from '@nestjs/common';
import { OrderService } from '../services/order.service';
import { CreateOrderDto } from '../dto/create-order.dto';
import Stripe from 'stripe';
import {AuthGuard} from "../auth.guard";
import * as process from "process"; // TypeScript compatible import

@Controller('order')
export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    @Get('/list')
    async getOrders() {
        return this.orderService.getAllOrders();
    }

    @Post('/webhook')
    async webhook(@Headers('stripe-signature') signature: string, @Req() req: RawBodyRequest<Request>) {
        const stripe = new Stripe(process.env.STRIPE_SECRET, {apiVersion: '2024-06-20'});
        const payload = req.rawBody;
        const event = await stripe.webhooks.constructEvent(
            payload,
            signature,
            process.env.STRIPE_WEBHOOK
        );
        console.log(event.type,event.data);

        if(event.type === 'charge.succeeded'){
            //const session = await stripe.checkout.sessions.list({payment_intent:event.data.object.payment_intent.toString(),limit:1});
            // const order = await this.orderService.getOrderBySession(session.data[0].id);
            // order.receiptUrl = event.data.object.receipt_url;
            const billingInfo = event.data.object.billing_details;
            const paymentInfo = event.data.object.payment_method_details;
            const receiptUrl = event.data.object.receipt_url;
            const paymentId = event.data.object.payment_intent.toString();
            const order = await this.orderService.createOrderByCharge(paymentId,billingInfo,paymentInfo,receiptUrl);

        }

        if(event.type === 'checkout.session.completed' ){
            console.log('Checkout Complete');
            const paymentId = event.data.object.payment_intent.toString();
            const sessionId = event.data.object.id;
            const total = event.data.object.amount_total;
            const email = event.data.object.customer_details.email;
            const lineItems = await stripe.checkout.sessions.listLineItems(sessionId);
            console.log(lineItems.data[0]);
            await this.orderService.updateOrderByCharge(
                paymentId, email, total, lineItems.data, event.data.object
            );
        }
        return {received: true}
    }

    @Get('/session-status')
    async sessionStatus(@Query('session_id') sessionId){
        const stripe = new Stripe(process.env.STRIPE_SECRET, {apiVersion: '2024-06-20'});
        const session = await stripe.checkout.sessions.retrieve(sessionId);
        console.log(session);
        return {
            status: session.status,
            customer_email: session.customer_details.email,
        };
    }

    @Post('/create-checkout-session')
    async checkout(@Body() createCheckout:any){
        const stripe = new Stripe(process.env.STRIPE_SECRET, {apiVersion: '2024-06-20'}); // Using new keyword because Stripe is a class
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
            billing_address_collection: 'required',
            automatic_tax: { enabled: true },
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
            return_url: `/confirmation?session_id={CHECKOUT_SESSION_ID}`,
        });

        return {clientSecret: session.client_secret};
    }

    @UseGuards(AuthGuard)
    @Get(':id')
    async getOrder(@Param() params: any){
        return this.orderService.getOrder(params.id);
    }
}
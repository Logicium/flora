import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { ProductService } from './product.service';
import { PaymentService } from './payment.service';
import {CreateOrderDto} from "../dto/create-order.dto";

@Injectable()
export class OrderService {
    constructor(
        @Inject(ProductService) private readonly productService: ProductService,
        @Inject(PaymentService) private readonly paymentService: PaymentService,
    ) {}

    async createOrder(createOrderDto: CreateOrderDto) {
        // Validate products and inventory
        const products = await this.productService.validateProducts(createOrderDto.products);

        // Process payment
        const paymentResult = await this.paymentService.processPayment(createOrderDto.payment);

        // Create order
        // ...

        return {
            // Order details
        };
    }
}
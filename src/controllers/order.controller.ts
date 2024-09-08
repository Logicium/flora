import { Controller, Post, Body } from '@nestjs/common';
import { OrderService } from '../services/order.service';
import { CreateOrderDto } from '../dto/create-order.dto';

@Controller('order')
export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    @Post()
    async createOrder(@Body() createOrderDto:
                          CreateOrderDto) {
        return this.orderService.createOrder(createOrderDto);
    }
}
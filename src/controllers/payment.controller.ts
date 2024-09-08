import {Controller, Post} from "@nestjs/common";
import {PaymentService} from "../services/payment.service";
import * as string_decoder from "string_decoder";

@Controller('payment')
export class PaymentController {
    constructor(private readonly paymentService: PaymentService) {}

    @Post()
    async makePayment(): Promise<string> {
        return 'Payment received.';
    }

    @Post('fail')
    async paymentFail(): Promise<string> {
        return 'Payment failed.';
    }

}
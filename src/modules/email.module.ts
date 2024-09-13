import {Module} from "@nestjs/common";
import {ProductController} from "../controllers/product.controller";
import {ProductService} from "../services/product.service";
import {EmailController} from "../controllers/email.controller";
import {EmailService} from "../services/email.service";

@Module({
    controllers: [EmailController],
    providers: [EmailService],
})

export class EmailModule {}
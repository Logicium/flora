import {Body, Controller, Get, Param, Post} from "@nestjs/common";
import {EmailService} from "../services/email.service";
import {CreateEmailDto} from "../dto/create-email.dto";

@Controller('email')
export class EmailController {
    constructor(private readonly emailService: EmailService) {}

    @Post('/contact')
    async sendContactEmail(@Body() createEmailDto:CreateEmailDto){
        console.log('MAIL MESSAGE: '+createEmailDto.message)
        await this.emailService.sendContactEmail(createEmailDto);
    }

}
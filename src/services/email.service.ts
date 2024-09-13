import {Injectable} from "@nestjs/common";
import {Product} from "../entities/product.entity";
import { MikroORM } from '@mikro-orm/core';
import { EntityManager } from '@mikro-orm/mysql';
import { MailerService } from '@nestjs-modules/mailer';
import {CreateEmailDto} from "../dto/create-email.dto";

@Injectable()
export class EmailService {
    constructor(private readonly mailerService: MailerService) {}
    async sendContactEmail(data){
        this.mailerService
            .sendMail({
                to: 'kisora.thomas@gmail.com', // list of receivers
                from: data.email, // sender address
                subject: 'New Message from '+ data.name, // Subject line
                text: data.message, // plaintext body
                html: '<b>{{data.message}}</b>', // HTML body content
            })
            .then(msg => console.log(msg)) // logs response data
            .catch(err => console.log(err));
    }

}
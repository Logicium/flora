import { Module } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { AuthController } from '../controllers/auth.controller';
import { UserModule } from '../modules/user.module';
import {JwtModule} from "@nestjs/jwt";
import secrets from "../../app.secret";

@Module({
    imports: [
        UserModule,
        JwtModule.register({
            global: true,
            secret: secrets.jwt.secret,
            signOptions: { expiresIn: '24h' },
        }),
    ],
    providers: [AuthService],
    controllers: [AuthController],

})
export class AuthModule {}
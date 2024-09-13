import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service'
import {JwtService} from "@nestjs/jwt";
import secrets from "../../app.secret";
@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) {}

    async signIn(email: string, pass: string): Promise<{token: string }> {
        const user = await this.userService.getUserByEmail(email);
        console.log(user);
        if (user?.password !== pass) {
            throw new UnauthorizedException();
        }
        const payload = { sub: user.id, username: user.email };
        return {
            token: await this.jwtService.signAsync(payload,{ secret:secrets.jwt.secret })
        };
    }
}
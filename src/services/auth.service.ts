import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service'
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from 'bcrypt'
import * as process from "process";

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) {}

    async signIn(email: string, password: string): Promise<{token: string }> {
        const user = await this.userService.getUserByEmail(email);
        console.log(user);
        console.log('password:'+password + 'user.password: '+user.password);
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new UnauthorizedException();
        }
        const payload = { sub: user.id, username: user.email };
        return {
            token: await this.jwtService.signAsync(payload,{ secret:process.env.JWT_SECRET })
        };
    }
}
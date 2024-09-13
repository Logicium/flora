import {Body, Controller, Post, HttpCode, Request, HttpStatus, UseGuards, Get} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import {AuthGuard} from "../auth.guard";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post('/login')
    signIn(@Body() signInDto: Record<string, any>) {
        return this.authService.signIn(signInDto.email, signInDto.password);
    }

    @UseGuards(AuthGuard)
    @Get('/account')
    getProfile(@Request() req) {
        return req.user;
    }
}
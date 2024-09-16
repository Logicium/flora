import {Body, Controller, Post, HttpCode, Request, HttpStatus, UseGuards, Get} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import {AuthGuard} from "../auth.guard";
import {UserService} from "../services/user.service";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService,private userService: UserService) {}

    @HttpCode(HttpStatus.OK)
    @Post('/login')
    signIn(@Body() signInDto: Record<string, any>) {
        return this.authService.signIn(signInDto.email, signInDto.password);
    }

    @Post('/signup')
    async signup(@Body() signupInfo:any) {
        const user = await this.userService.newUser(signupInfo);
        return this.authService.signIn(user.email,signupInfo.password)
    }

    @UseGuards(AuthGuard)
    @Get('/account')
    getProfile(@Request() req) {
        return this.userService.getUserById(req.user.sub);
    }
}
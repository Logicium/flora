import {Body, Controller, Get, Post} from '@nestjs/common';
import {UserService} from "../services/user.service";

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    // @Post('/signup')
    // signup(@Body() signupInfo:any) {
    //     return this.userService.newUser(signupInfo);
    // }
}

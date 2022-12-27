import { Controller, Get, Query } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('kakao')
export class UserController {
    constructor(private userService: UserService) {}

    @Get('login')
    kakaoLogin(@Query('code') code: string) {
        console.log(code);
        return this.userService.kakaoLogin(code);
    }
}
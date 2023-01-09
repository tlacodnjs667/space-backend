import { Controller, Post, Body, Res, Get, Headers } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { Response } from 'express';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  async createUser(@Body() createUserDto: CreateUserDto) {
    try {
      const result = await this.userService.createUser(createUserDto);
      return result;
    } catch (err) {
      console.error(err);
      return err;
    }
  }

  @Post('login')
  async name(@Body() loginInfo: LoginUserDto, @Res() res: Response) {
    console.log(loginInfo);
    try {
      const a = await this.userService.checkUser(loginInfo);
      console.log(a);
      return res.status(200).send({ data: a });
    } catch (err) {
      console.error(err);
      return err;
    }
  }

  @Get('check-token') //JWT -VALIDATE 확인을 위해 만들어진 API => 삭제 무방
  async checkAccessToken(@Headers('accesstoken') token: string): Promise<void> {
    return this.userService.checkAccessToken(token);
  }
}

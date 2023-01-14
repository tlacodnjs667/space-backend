import { Controller, Post, Body, Res, Get, Headers } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, ReturnCreated } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { Response } from 'express';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<ReturnCreated> {
    try {
      return await this.userService.createUser(createUserDto);
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
}

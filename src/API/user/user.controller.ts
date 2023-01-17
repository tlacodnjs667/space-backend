import { Controller, Post, Body, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, ReturnCreated } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { Response } from 'express';
import { access } from 'fs';
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
  async loginUser(@Body() loginInfo: LoginUserDto, @Res() res: Response) {
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

  @Post('google')
  async getInfoOfkakaoUser(@Body('access_token') token: string) {}

  @Post('kakao')
  async kakaoLogin(@Body('access_token') token: string) {
    return this.userService.kakaoLogin(token);
  }
}

// const {data} = responseByGoogle;
// const {access_token} =data;

// const urlToUserInfo = `https://www.googleapis.com/userinfo/v2/me?access_token=${access_token}`

// const responseAboutUserInfo = await axios.get(urlToUserInfo)
// console.log(responseAboutUserInfo.data);

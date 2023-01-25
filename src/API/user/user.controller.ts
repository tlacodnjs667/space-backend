import { Controller, Post, Body, Res, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { LoginUserDto } from './dto/login-user.dto';
import { Response } from 'express';
import { GetGoogleUser } from './dto/get-google-user.dto';
import { RequestForFormData } from './dto/create-user.dto';
import { ReturnCreated } from '../order/IOrderInterface';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  async createUser(@Req() req: RequestForFormData): Promise<ReturnCreated> {
    try {
      const createUserDto = req.body;

      if (req.file) {
        console.log(req.file);

        const { location } = req.file;
        createUserDto.thumbnail = location;
      }

      return await this.userService.createUser(createUserDto);
    } catch (err) {
      console.error(err);
      return err;
    }
  }

  @Post('login')
  async loginUser(@Body() loginInfo: LoginUserDto, @Res() res: Response) {
    console.log(loginInfo);
    const data = await this.userService.checkUser(loginInfo);
    return res.status(200).send({ data });
  }

  @Post('google')
  async getInfoOfGoogleUser(
    @Body('credentialResponse') credentialResponse: GetGoogleUser,
  ) {
    return await this.userService.getInfoOfGoogleUser(credentialResponse);
  }

  @Post('kakao')
  async kakaoLogin(@Body('access_token') access_token: string) {
    console.log(access_token);
    return this.userService.kakaoLogin(access_token);
  }
}

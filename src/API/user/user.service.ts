import { Injectable } from '@nestjs/common';
import { CreateUserDto, ReturnCreated } from './dto/create-user.dto';
import { userRepository } from './user.repository';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
import { UserInfoForJWT } from './dto/make-user-jwt.dto';
dotenv.config();
@Injectable()
export class UserService {
  constructor(private readonly jwtService: JwtService) {}
  async createUser(user: CreateUserDto): Promise<ReturnCreated> {
    const checkForDuplicate = await userRepository.checkUserInDB(user.email);

    if (checkForDuplicate.length) {
      const error = new Error('DUPLICATED_EMAIL');
      throw error;
    }

    await this.transformPassword(user);

    const queryForKeys = [];
    const queryForValues = [];

    for (const [key, value] of Object.entries(user)) {
      if (key) {
        queryForKeys.push(key);
        queryForValues.push("'" + value + "'");
      }
    }
    return userRepository.createUser(
      queryForKeys.join(', '),
      queryForValues.join(', '),
    );
  }

  async checkUser(user: LoginUserDto) {
    const [userInfoFromDB] = await userRepository.checkUserInDB(user.email);
    console.log(userInfoFromDB);

    const checkForClient = await this.checkHash(
      user.password,
      userInfoFromDB.password,
    );

    if (!checkForClient) {
      const error = new Error("PASSWORD_ISN'T VALID");
      throw error;
    }
    const token = await this.getAccessToken(userInfoFromDB);
    console.log(token);
    return token;

    //이제 JWT 발급해야함.
  }

  async transformPassword(user: CreateUserDto) {
    user.password = await bcrypt.hash(
      user.password,
      Number(process.env.SALTROUNDS),
    );
    return Promise.resolve();
  }

  async checkHash(password: string, hashedPassword: string) {
    return await bcrypt.compare(password, hashedPassword);
  }

  async getAccessToken(user: UserInfoForJWT) {
    return this.jwtService.sign(
      { email: user.email, userId: user.id },
      { secret: process.env.JWT_SECRETKEY, expiresIn: '1h' },
    );
  }

  async checkAccessToken(token: string) {
    //JWT -VALIDATE 확인을 위해 만들어진 API
    const a = this.jwtService.verify(token, {
      secret: process.env.JWT_SECRETKEY,
    });

    return a;
  }
}

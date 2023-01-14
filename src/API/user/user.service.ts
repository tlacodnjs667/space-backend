import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto, ReturnCreated } from './dto/create-user.dto';
import { UserRepository } from './user.repository';
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
    const checkForDuplicate = await UserRepository.checkUserInDB(user.email);

    if (checkForDuplicate.length) {
      throw new HttpException('DUPLICATED_EMAIL', HttpStatus.CONFLICT);
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
    return UserRepository.createUser(
      queryForKeys.join(', '),
      queryForValues.join(', '),
    );
  }

  async checkUser(user: LoginUserDto) {
    const [userInfoFromDB] = await UserRepository.checkUserInDB(user.email);
    console.log(userInfoFromDB);

    const checkForClient = await this.checkHash(
      user.password,
      userInfoFromDB.password,
    );

    if (!checkForClient) {
      throw new HttpException("PASSWORD_ISN'T_VALID", HttpStatus.UNAUTHORIZED);
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
}

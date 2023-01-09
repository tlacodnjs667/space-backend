import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import { UserInfoForJWT } from './dto/make-user-jwt.dto';
dotenv.config();

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  getAccessToken(user: UserInfoForJWT) {
    return this.jwtService.sign(
      { email: user.email, sub: user.id },
      { secret: process.env.JWT_SECRETKEY, expiresIn: '1h' },
    );
  }

  validateAccessToken(authorization: string) {
    const verify = this.jwtService.verify(authorization, {
      secret: process.env.JWT_SECRETKEY,
    });
    console.log(verify);
    return verify;
  }
}

import {
  Injectable,
  NestMiddleware,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { NextFunction, Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from 'src/API/user/user.repository';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    if (!req.headers.authorization) {
      throw new HttpException(
        'NOT_FOUND_AUTHORIZATION',
        HttpStatus.UNAUTHORIZED,
      );
    }
    const { authorization } = req.headers;
    const { userId, email } = this.jwtService.verify(authorization, {
      secret: process.env.JWT_SECRETKEY,
    });

    const [validatedUser] = await UserRepository.checkValidation(userId, email);
    if (!validatedUser)
      throw new HttpException('UNVALID_TOKEN', HttpStatus.NOT_ACCEPTABLE);

    req.headers.user = userId;

    next();
  }
}

// 'https://accounts.google.com/o/oauth2/v2/auth?' +
//   'scope=${받아올 정보 입력하는 곳}' +
//   '&response_type=code' +
//   '&access_type=offline' +
//   '&include_granted_scopes=true' +
//   '&state=state_parameter_passthrough_value' +
//   '&redirect_uri=http://127.0.0.1:3000/user/google' +
//   '&client_id=1127160418-umsgvrpsdglvh8ebpta4is03h5dq5755.apps.googleusercontent.com';

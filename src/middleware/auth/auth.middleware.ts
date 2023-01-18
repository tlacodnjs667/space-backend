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

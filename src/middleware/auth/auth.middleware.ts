import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from 'src/API/user/user.repository';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    // console.log(req.headers.authorization);

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
    const query = `id = ${userId}`;
    const [validatedUser] = await UserRepository.checkUserInDB(query);
    if (validatedUser.email !== email)
      throw new HttpException('UNVALID_TOKEN', HttpStatus.NOT_ACCEPTABLE);

    req.headers.user = userId;
    console.log(req.headers.user);

    next();
  }
}

import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}
  use(req: Request, res: Response, next: NextFunction) {
    try {
      if (req.headers.authorization) {
        const { authorization } = req.headers;
        const { userId } = this.jwtService.verify(authorization, {
          secret: process.env.JWT_SECRETKEY,
        });
        req.body.userId = userId;
      } else {
        const error = new Error('AUTHORIZATION_IS_MISSING_OR_INVALIDE_TYPE');
        throw error;
      }
    } catch (err) {
      console.error(err);
    }
    next();
  }
}

import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request } from 'express';
import { UserRepository } from 'src/API/user/user.repository';

@Injectable()
export class CheckUserInfoFromAuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    if (req.headers.authorization) {
      const { authorization } = req.headers;
      const { userId } = this.jwtService.verify(authorization, {
        secret: process.env.JWT_SECRETKEY,
      });

      const [checkUserGender] = await UserRepository.checkUserInDB(userId);

      req.headers.user = userId;
      req.body.gender = checkUserGender.gender;
      console.log(req.headers.user);
    }

    next();
  }
}

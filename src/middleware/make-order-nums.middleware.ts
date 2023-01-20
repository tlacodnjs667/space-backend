import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class MakeOrderNumsMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    req.body.orderNumber = makeOrderNum();
    req.body.trackingNumber = req.body.products.map((el: number) =>
      makeTrackingNum(),
    );
    next();
  }
}

function makeTrackingNum(): string {
  return makeString(Math.floor(Math.random() * 10 ** 16), 16);
}
function makeOrderNum(): string {
  const ahora = new Date();
  return (
    ahora.getFullYear() +
    makeString(ahora.getMonth() + 1, 2) +
    makeString(ahora.getDate(), 2) +
    makeString(ahora.getHours(), 2) +
    makeString(ahora.getMinutes(), 2) +
    makeString(Math.floor(Math.random() * 1000), 3)
  );
}

function makeString(number: number, n: number): string {
  return number.toString().padStart(n, '0');
}
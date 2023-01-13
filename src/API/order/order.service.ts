import { Injectable } from '@nestjs/common';
import { CreateOrderDto, ProductListForOrder } from './dto/create-order.dto';

@Injectable()
export class OrderService {
  async orderProducts(orderInfo: CreateOrderDto, userId: number) {
    if (Array.isArray(orderInfo.products)) {
      orderInfo.products = orderInfo.products
        .map((el: ProductListForOrder) => `(${el.optionId}, ${el.quantity})`)
        .join(', ');
    }
  }
}

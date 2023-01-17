import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { orderRepository } from './order.repository';

@Injectable()
export class OrderService {
  async orderProducts(orderInfo: CreateOrderDto) {
    if (Array.isArray(orderInfo.products)) {
      orderInfo.products = orderInfo.products
        .map((el: any) => `(${el.optionId}, ${el.quantity})`)
        .join(', ');
    }
  }
}

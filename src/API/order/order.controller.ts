import { Controller, Post, Body } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  orderProducts(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.orderProducts(createOrderDto);
  }
}

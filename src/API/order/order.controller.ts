import { Controller, Post, Body, Headers } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  orderProducts(
    @Body() createOrderDto: CreateOrderDto,
    @Headers('user') userId: string,
  ) {
    console.log(userId);

    // return this.orderService.orderProducts(createOrderDto);
  }
}

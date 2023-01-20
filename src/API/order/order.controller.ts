import {
  Controller,
  Post,
  Body,
  Headers,
  Get,
  Query,
  Delete,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { OrderService } from './order.service';
import {
  CreateOrderDtoByOption,
  CreateOrderDtoByUser,
} from './dto/create-order.dto';
import { GetOrderInfoFilter } from './orderInterface';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('by-cart')
  async orderProducts(
    @Headers('user') userId: number,
    @Body() orderInfo: CreateOrderDtoByUser,
  ) {
    const message = await this.orderService.orderProducts(orderInfo, userId);
    return { message };
  }
  @Post('by-optionId')
  async orderProductsByOption(
    @Headers('user') userId: number,
    @Body() orderInfo: CreateOrderDtoByOption,
  ) {
    return this.orderService.makeOrderProductByProduct(orderInfo, userId);
  }

  @Get('history')
  async getOrderHistory(
    @Headers('user') userId: number,
    @Query() dateFilter: GetOrderInfoFilter,
  ) {
    return this.orderService.getOrderHistory(userId, dateFilter);
  }

  @Delete('all')
  async withdrawOrder(
    @Headers('user') userId: number,
    @Body('orderId') orderId: number,
  ) {
    const message = await this.orderService.withdrawOrder(userId, orderId);

    return { message };
  }

  @Delete('/:orderProductId')
  async withdrawOrderByOption(
    @Param('orderProductId', new ParseIntPipe()) orderProductId: number,
    @Headers('user') userId: number,
  ) {
    const message = await this.orderService.withdrawOrderByOption(
      orderProductId,
      userId,
    );

    return { message };
  }
}

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
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { OrderService } from './order.service';
import {
  CreateOrderDtoByOption,
  CreateOrderDtoByUser,
} from './dto/create-order.dto';
import { GetOrderInfoFilter } from './IOrderInterface';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('by-cart')
  async orderProducts(
    @Headers('user') userId: number,
    @Body() orderInfo: CreateOrderDtoByUser,
  ) {
    if (!orderInfo.address || !orderInfo.detail_address || !orderInfo.phone)
      throw new HttpException('INVALID_SHIPMENT', HttpStatus.BAD_REQUEST);
    if (!orderInfo.cartInfo.length)
      throw new HttpException('INVALID_ORDER_OPTION', HttpStatus.BAD_REQUEST);
    const message = await this.orderService.orderProducts(orderInfo, userId);
    return { message };
  }
  @Post('by-optionId')
  async orderProductsByOption(
    @Headers('user') userId: number,
    @Body() orderInfo: CreateOrderDtoByOption,
  ) {
    if (!orderInfo.address || !orderInfo.detail_address || !orderInfo.phone)
      throw new HttpException('INVALID_SHIPMENT', HttpStatus.BAD_REQUEST);

    if (!orderInfo.optionId || !orderInfo.quantity)
      throw new HttpException('INVALID_ORDER_OPTION', HttpStatus.BAD_REQUEST);

    return this.orderService.makeOrderProductByProduct(orderInfo, userId);
  }
  @Post()
  getOrderInfo(
    //구매하기 페이지
    @Headers('user') userId: number,
    @Body('cartIdList') cartIdList: number[],
  ) {
    if (!cartIdList.length)
      throw new HttpException('INVALID_ORDER_OPTION', HttpStatus.BAD_REQUEST);

    return this.orderService.getOrderInfo(userId, cartIdList);
  }

  @Get('history/:user')
  async getOrderHistory(
    //유저 오더 히스토리 (나의 쇼핑 정보)
    @Param('user') userId: number,
    @Query() dateFilter: GetOrderInfoFilter,
  ) {
    return this.orderService.getOrderHistory(userId, dateFilter);
  }
  @Get('mypage/:user') // 마이페이지 오더 인포 (my 페이지 default)
  async getMypageOrderInfo(@Param('user') userId: number) {
    return this.orderService.getMypageOrderInfo(userId);
  }

  @Delete('all')
  async withdrawOrder(
    @Headers('user') userId: number,
    @Body('orderId') orderId: number,
  ) {
    if (!orderId)
      throw new HttpException('INVALID_ORDER_OPTION', HttpStatus.BAD_REQUEST);

    const message = await this.orderService.withdrawOrder(userId, orderId);

    return { message };
  }

  @Delete('/:orderProductId')
  async withdrawOrderByOption(
    @Param('orderProductId', new ParseIntPipe()) orderProductId: number,
    @Headers('user') userId: number,
  ) {
    if (!orderProductId)
      throw new HttpException('INVALID_', HttpStatus.BAD_REQUEST);

    const message = await this.orderService.withdrawOrderByOption(
      orderProductId,
      userId,
    );

    return { message };
  }
}

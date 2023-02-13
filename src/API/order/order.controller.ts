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
  CreateOrderDtoByOptionInProductDetail,
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
    console.log(orderInfo);
    console.log('구매하기 페이지 요청');

    if (!orderInfo.address || !orderInfo.detail_address || !orderInfo.phone)
      throw new HttpException('INVALID_SHIPMENT', HttpStatus.BAD_REQUEST);
    if (!orderInfo.cartInfo.length)
      throw new HttpException('INVALID_ORDER_OPTION', HttpStatus.BAD_REQUEST);
    const message = await this.orderService.orderProducts(orderInfo, userId);
    return { message };
  }

  @Post('product-detail')
  async orderProductByOptionsAtProductDetail(
    @Headers('user') userId: number,
    @Body() orderInfo: CreateOrderDtoByOptionInProductDetail,
  ) {
    if (!orderInfo.address || !orderInfo.detail_address || !orderInfo.phone)
      throw new HttpException('INVALID_SHIPMENT', HttpStatus.BAD_REQUEST);
    if (!orderInfo.optionsInfo.length)
      throw new HttpException('INVALID_ORDER_OPTION', HttpStatus.BAD_REQUEST);
    const message =
      await this.orderService.orderProductByOptionsAtProductDetail(
        orderInfo,
        userId,
      );
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
    @Body('cartId') cartId: number[] | number,
  ) {
    console.log('구매하기 페이지 요청');
    if (!cartId)
      throw new HttpException('INVALID_ORDER_OPTION', HttpStatus.BAD_REQUEST);

    return this.orderService.getOrderInfo(userId, cartId);
  }

  @Get('history')
  async getOrderHistory(
    @Headers('user') userId: number,
    @Query() dateFilter: GetOrderInfoFilter,
  ) {
    return this.orderService.getOrderHistory(userId, dateFilter);
  }

  @Get('mypage') // 마이페이지 오더 인포 (my 페이지 default)
  async getMypageOrderInfo(@Headers('user') userId: number) {
    console.log('mypage');
    return this.orderService.getMypageOrderInfo(userId);
  }

  @Delete('all')
  async withdrawOrder(
    @Headers('user') userId: number,
    @Param('orderId') orderId: string,
  ) {
    if (!orderId)
      throw new HttpException('INVALID_ORDER_OPTION', HttpStatus.BAD_REQUEST);

    const message = await this.orderService.withdrawOrder(userId, +orderId);

    return { message };
  }

  @Delete('/:orderProductId')
  async withdrawOrderByOption(
    @Headers('user') userId: number,
    @Param('orderProductId', new ParseIntPipe()) orderProductId: number,
  ) {
    if (!orderProductId)
      throw new HttpException('INVALID_REQUEST', HttpStatus.BAD_REQUEST);

    const message = await this.orderService.withdrawOrderByOption(
      orderProductId,
      userId,
    );

    return { message };
  }
}

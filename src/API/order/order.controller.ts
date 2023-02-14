import {
  Controller,
  Post,
  Body,
  Headers,
  Get,
  Query,
  Delete,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { OrderService } from './order.service';
import {
  CreateOrderDtoByOptionInProductDetail,
  CreateOrderDtoByUser,
} from './dto/create-order.dto';
import { GetOrderInfoFilter, IOption } from './IOrderInterface';

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
    @Body() orderInfo: CreateOrderDtoByOptionInProductDetail,
  ) {
    if (!orderInfo.address || !orderInfo.detail_address || !orderInfo.phone)
      throw new HttpException('INVALID_SHIPMENT', HttpStatus.BAD_REQUEST);

    if (!orderInfo.optionsInfo)
      throw new HttpException('INVALID_ORDER_OPTION', HttpStatus.BAD_REQUEST);

    return this.orderService.orderProductByOptionsAtProductDetail(
      orderInfo,
      userId,
    );
  }

  @Post()
  getOrderInfo(
    //프로덕트 디테일에서 바로 구매하기 페이지 넘어가는 부분
    @Headers('user') userId: number,
    @Body('optionIdList') optionIdList: IOption[] | null,
    @Body('cartIdList') cartIdList: number[] | null,
  ) {
    if (!optionIdList && !cartIdList) {
      throw new HttpException(
        'DO_NOT_FIND_PROD_INFO_TO_ORDER',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (Array.isArray(optionIdList) && optionIdList.length)
      return this.orderService.getOrderInfoByOption(userId, optionIdList);

    if (Array.isArray(cartIdList) && cartIdList.length)
      return this.orderService.getOrderInfo(userId, cartIdList);

    throw new HttpException('_ERROR_', HttpStatus.CONFLICT);
  }

  // @Post()
  // getOrderInfo(
  //   //구매하기 페이지
  //   @Headers('user') userId: number,
  //   @Body('cartIdList') cartIdList: number[],
  // ) {
  //   if (!cartIdList.length)
  //     throw new HttpException('INVALID_ORDER_OPTION', HttpStatus.BAD_REQUEST);

  //   return this.orderService.getOrderInfo(userId, cartIdList);
  // }

  @Get('history')
  async getOrderHistory(
    @Headers('user') userId: number,
    @Query() dateFilter: GetOrderInfoFilter,
  ) {
    return this.orderService.getOrderHistory(userId, dateFilter);
  }

  @Get('mypage') // 마이페이지 오더 인포 (my 페이지 default)
  async getMypageOrderInfo(@Headers('user') userId: number) {
    return this.orderService.getMypageOrderInfo(userId);
  }

  @Delete('all/:orderId')
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
    @Param('orderProductId') orderProductId: string,
  ) {
    if (!orderProductId)
      throw new HttpException('INVALID_REQUEST', HttpStatus.BAD_REQUEST);

    const message = await this.orderService.withdrawOrderByOption(
      +orderProductId,
      userId,
    );

    return { message };
  }
}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  CreateOrderDtoByOption,
  CreateOrderDtoByOptionInProductDetail,
  CreateOrderDtoByUser,
} from './dto/create-order.dto';
import { OrderRepository } from './order.repository';
import { UserRepository } from '../user/user.repository';
import {
  GetOrderInfoFilter,
  IOption,
  IProdInfoByOptionId,
} from './IOrderInterface';
import { ORDER_STATUS, SHIPMENT_STATUS } from './StatusEnum';
import { ProductRepository } from '../product/product.repository';

@Injectable()
export class OrderService {
  async orderProducts(orderInfo: CreateOrderDtoByUser, userId: number) {
    const [userInfo] = await UserRepository.getUserPoint(userId);
    if (userInfo.point < orderInfo.price) {
      throw new HttpException('LACK_OF_USER_POINT', HttpStatus.BAD_REQUEST);
    }
    return OrderRepository.makeOrderProduct(orderInfo, userId);
  }

  async orderProductByOptionsAtProductDetail(
    orderInfo: CreateOrderDtoByOptionInProductDetail,
    userId: number,
  ) {
    const [userInfo] = await UserRepository.getUserPoint(userId);
    if (userInfo.point < orderInfo.price) {
      throw new HttpException('LACK_OF_USER_POINT', HttpStatus.BAD_REQUEST);
    }
    return OrderRepository.orderProductByOptionsAtProductDetail(
      orderInfo,
      userId,
    );
  }

  async makeOrderProductByProduct(
    orderInfo: CreateOrderDtoByOption,
    userId: number,
  ) {
    const [userInfo] = await UserRepository.getUserPoint(userId);
    const [optionPrice] = await ProductRepository.getProductPriceByOption(
      orderInfo.optionId,
    );
    if (userInfo.point < optionPrice.price * orderInfo.quantity) {
      throw new HttpException('LACK_OF_USER_POINT', HttpStatus.BAD_REQUEST);
    }
    orderInfo.price = optionPrice.price * orderInfo.quantity;
    return OrderRepository.makeOrderProductByProduct(orderInfo, userId);
  }

  async getOrderInfo(userId: number, cartIdList: number[] | number) {
    const [userInfo] = await UserRepository.getUserInfoForOrder(userId);
    const orderInfo = await OrderRepository.getOrderInfo(cartIdList);

    return { userInfo, orderInfo };
  }

  async getOrderInfoByOption(userId: number, optionIdList: IOption[]) {
    const [userInfo] = await UserRepository.getUserInfoForOrder(userId);
    const optionIds = optionIdList.map((el) => el.optionId);
    const orderInfoToReturn: IProdInfoByOptionId[] =
      await OrderRepository.getOrderInfoByOption(optionIds);

    const orderInfo = orderInfoToReturn.map((el) => {
      for (let i = 0; i < optionIdList.length; i++) {
        if (optionIdList[i].optionId != el.optionId) continue;
        else {
          el.priceByProduct *= optionIdList[i].quantity;
          el.quantity = optionIdList[i].quantity;
          break;
        }
      }
      return el;
    });

    return { userInfo, orderInfo };
  }

  async getOrderHistory(userId: number, historyFilter: GetOrderInfoFilter) {
    if (
      historyFilter.history_end_date?.length &&
      historyFilter.history_start_date?.length
    ) {
      let query = `'${historyFilter.history_start_date}' AND '${historyFilter.history_end_date}' AND o.userId = ${userId}`;
      if (historyFilter.order_status) {
        query += ` AND orderStatusId = ${
          ORDER_STATUS[historyFilter.order_status]
        }`;
      }

      const orderList = await OrderRepository.getOrderHistory(query);
      const orderFilter = await OrderRepository.orderHistoryFilter();

      return { orderFilter, orderList };
    }

    const now = new Date();

    let query = `${makeDateQuery(now)} AND userId = ${userId}`;

    if (historyFilter.order_status && !historyFilter.order_status.length) {
      query += ` AND orderStatusId = ${
        ORDER_STATUS[historyFilter.order_status]
      }`;
    }

    const orderList = await OrderRepository.getOrderHistory(query);
    const orderFilter = await OrderRepository.orderHistoryFilter();

    return {
      orderList,
      orderFilter,
    };
  }

  async withdrawOrder(userId: number, orderId: number) {
    const [checkMatchUser] = await OrderRepository.checkOrder(orderId);
    if (checkMatchUser.userId !== userId) {
      throw new HttpException('NOT_MATCHED_OWNER', HttpStatus.FORBIDDEN);
    }

    if (checkMatchUser.orderStatusId < ORDER_STATUS.PAID) {
      throw new HttpException('NOT_PAID_ORDER', HttpStatus.BAD_REQUEST);
    }
    if (checkMatchUser.orderStatusId === ORDER_STATUS.PURCHASE_CONFIRMED) {
      throw new HttpException('CONFIRMED_ORDER', HttpStatus.FORBIDDEN);
    }
    if (
      checkMatchUser.orderStatusId === ORDER_STATUS.CANCLE_PAYMENT ||
      checkMatchUser.orderStatusId === ORDER_STATUS.REFUNDED ||
      checkMatchUser.orderStatusId === ORDER_STATUS.REFUND_REQUESTED
    ) {
      throw new HttpException(
        'CANNOT_REQUEST_REFUNDED_OR_REFUND_REQUESTED_ORDER',
        HttpStatus.CONFLICT,
      );
    }
    return OrderRepository.withdrawOrder(orderId, userId);
  }
  async getMypageOrderInfo(userId: number) {
    const now = new Date();
    const query = `${makeDateQuery(now)} AND userId = ${userId}`;

    const orderStatus = await OrderRepository.getOrderStatus();
    const orderCountByStatus = await OrderRepository.getMypageOrderInfo(query);
    const orderHistory = await OrderRepository.getOrderHistory(query);

    return { orderStatus, orderCountByStatus, orderHistory };
  }

  async withdrawOrderByOption(
    orderProductId: number,
    userId: number,
  ): Promise<string> {
    const [checkUser] = await OrderRepository.checkOrderOwner(orderProductId);

    if (checkUser.userId !== userId) {
      throw new HttpException('UNMATCH_ORDER_OWNER', HttpStatus.FORBIDDEN);
    }

    const [checkStatus] = await OrderRepository.checkShipmentStatus(
      orderProductId,
    );

    if (
      checkStatus.shipmentStatusId === SHIPMENT_STATUS.PURCHASE_CONFIRMED ||
      checkStatus.shipmentStatusId === SHIPMENT_STATUS.REFUND_REQUESTED ||
      checkStatus.shipmentStatusId === SHIPMENT_STATUS.REFUND_COMPLETED ||
      checkStatus.shipmentStatusId === SHIPMENT_STATUS.ORDER_CANCLED
    ) {
      throw new HttpException(
        'CANNOT_WITHDRAW_CONFIRMED_ORDER_OR_ALREADY_REFUNDED_PRODUCTS',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (checkStatus.shipmentStatusId === SHIPMENT_STATUS.PREPARING_PRODUCT) {
      await OrderRepository.withdrawOrderByOption(orderProductId, userId);
      return 'CANCLE_REQUEST_COMPLETED';
    }

    await OrderRepository.changeStatusForRefundRequestByProduct(orderProductId);
    return 'REFUND_REQUESTED';
    //환불 요청으로 status 값 변화만 주기
  }
}

function makeDateQuery(now: Date): string {
  now.setDate(now.getDate());
  const endDateForm = `'${now.getFullYear()}-${(now.getMonth() + 1)
    .toString()
    .padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}'`;

  now.setMonth(now.getMonth() - 3);

  const startDateForm = `'${now.getFullYear()}-${(now.getMonth() + 1)
    .toString()
    .padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}'`;

  return `${startDateForm} AND ${endDateForm}`;
}

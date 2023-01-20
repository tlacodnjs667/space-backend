import { AppDataSource } from 'src/config/database-config';
import {
  CreateOrderDtoByOption,
  CreateOrderDtoByUser,
} from './dto/create-order.dto';
import { OrderHistoryFilter, ProductInfo } from './IOrderInterface';
import { Order } from '../../entities/order.entity';
import { ORDER_STATUS, SHIPMENT_STATUS } from './StatusEnum';
import { HttpException, HttpStatus } from '@nestjs/common';
import { ProductsByOrder } from './IOrderInterface';

export const OrderRepository = AppDataSource.getRepository(Order).extend({
  async makeOrderProduct(
    orderInfo: CreateOrderDtoByUser,
    userId: number,
  ): Promise<string> {
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    let message = '';
    try {
      const optionsInfoToOrder: ProductInfo[] = await queryRunner.query(`
          SELECT 
              id,
              userId,
              optionId,
              quantity
          FROM carts
          WHERE id IN (${orderInfo.cartInfo.join(', ')})
      `);

      if (!optionsInfoToOrder.length) {
        throw new HttpException(
          'DO_NOT_EXIST_PRODUCT_IN_USER_CARTS_FOR_SELECTED_CART_ID',
          HttpStatus.BAD_REQUEST,
        );
      }

      optionsInfoToOrder.forEach((el) => {
        if (userId !== el.userId)
          throw new HttpException(
            'DONT_MATCH_CART_OWNER',
            HttpStatus.FORBIDDEN,
          );
      });

      const { insertId: shipmentId } = await queryRunner.query(`
        INSERT INTO shipment (
          address,
          detail_address,
          zip_code
        ) VALUES (
          '${orderInfo.address}',
          '${orderInfo.detail_address}',
          '${orderInfo.zip_code}'
        )
      `);
      console.log('셋');

      const { insertId: orderId } = await queryRunner.query(`
          INSERT INTO orders (
              order_number,
              userId,
              total_price,
              shipmentId,
              orderStatusId
          ) VALUES (
            '${orderInfo.orderNumber}',
            ${userId},
            ${orderInfo.price},
            ${shipmentId},
            ${ORDER_STATUS.BEFORE_PAYMENT}
          );
      `);

      const queryForOptionProductInfo = optionsInfoToOrder
        .map(
          (el: ProductInfo, index: number) =>
            `( ${el.optionId}, ${el.quantity}, ${orderId},  '${orderInfo.trackingNumber[index]}', ${SHIPMENT_STATUS.PREPARING_PRODUCT} )`,
        )
        .join(', ');
      // ${orderInfo.trackingNumber[index]},
      // trackingNumber,
      await queryRunner.query(`
          INSERT INTO order_products (
              productOptionId,
              quantity,
              orderId,
              tracking_number,
              shipmentStatusId
          ) VALUES 
          ${queryForOptionProductInfo}
      `);

      await queryRunner.query(`
            DELETE FROM carts
            WHERE id IN (${orderInfo.cartInfo.join(
              ', ',
            )}) AND userId = ${userId}
      `);

      optionsInfoToOrder.forEach((el) => {
        queryRunner.query(`
            UPDATE product_options 
            SET stock = stock - ${el.quantity} 
            WHERE id = ${el.optionId}
        `);
      });

      await queryRunner.query(`
          UPDATE user
          SET points = points - ${orderInfo.price}
          WHERE id = ${userId}
      `);

      await queryRunner.query(`
          UPDATE orders
          SET orderStatusId = ${ORDER_STATUS.PAID}
          WHERE id = ${orderId}
      `);

      await queryRunner.commitTransaction();
      message = 'ORDER_SUCCESS';
    } catch (err) {
      console.error(err);
      await queryRunner.rollbackTransaction();
      message = 'ERROR_IN_THE_MIDDLE_OF_ORDER';
    } finally {
      await queryRunner.release();
      return message;
    }
  },
  async getOrderHistory(query: string) {
    // return OrderRepository.query(`
    //     SELECT
    //         o.id,
    //         order_number,
    //         o.created_at,
    //         order_status.name AS orderStatus,
    //         JSON_ARRAYAGG(opInfo) AS orderProductInfo,
    //         JSON_OBJECT(
    //           'address',address,
    //           'detail_address',detail_address,
    //           'zip_code', zip_code
    //         ) AS addressInfo
    //     FROM orders o
    //     LEFT JOIN order_status ON o.orderStatusId = order_status.id
    //     LEFT JOIN shipment ON o.shipmentId = shipment.id
    //     LEFT JOIN (
    //         SELECT
    //             op.orderId,
    //             JSON_OBJECT(
    //                 'trackingNumber',tracking_number,
    //                 'shippingCompany', shippingCompany,
    //                 'shipment_status', shipment_status.name,
    //                 'orderProductId', op.id,
    //                 'quantity',quantity,
    //                 'optionInfo', optionInfo,
    //                 'productName', productName,
    //                 'price', price * quantity
    //             ) AS opInfo
    //         FROM order_products op
    //         LEFT JOIN shipment_status ON op.shipmentStatusId = shipment_status.id
    //         LEFT JOIN (
    //               SELECT
    //                   po.id AS optionId,
    //                   JSON_OBJECT(
    //                       'size', s.name,
    //                       'colorName', colors.name
    //                   ) AS optionInfo,
    //                   product.name AS productName,
    //                   product.price AS price
    //               FROM product_options po
    //               LEFT JOIN size s ON po.sizeId = s.id
    //               LEFT JOIN product_color pc ON pc.id = po.productColorId
    //               LEFT JOIN colors ON pc.colorId = colors.id
    //               LEFT JOIN product ON product.id = pc.productId
    //         ) AS productInfo ON productInfo.optionId = op.productOptionId
    //     ) AS productInfo ON productInfo.orderId = o.id
    //     WHERE  DATE(created_at) between ${query}
    //     GROUP BY o.id
    // `);=> 오더별
    return OrderRepository.query(`
        SELECT
            op.id AS orderProductId,
            quantity,
            order_number,
            JSON_OBJECT(
                'trackingNumber',tracking_number,
                'shippingCompany', shippingCompany
            ) AS shippingInfo,
            shippingAddress,
            orderStatus,
            orderInfo.created_at,
            productInfo.optionInfo,
            productInfo.price * quantity AS pricePerProduct,
            productName,
            op.orderId
        FROM order_products op
        LEFT JOIN (
            SELECT
                orders.id AS orderId,
                userId,
                orders.order_number,
                orders.created_at,
                JSON_OBJECT(
                  'address',shipment.address,
                  'detail_address',shipment.detail_address,
                  'zip_code',shipment.zip_code
                ) AS shippingAddress,
                os.name AS orderStatus
            FROM orders
            LEFT JOIN order_status os ON os.id = orders.orderStatusId
            LEFT JOIN shipment ON shipment.id = orders.shipmentId
        ) AS orderInfo ON orderInfo.orderId = op.orderId
        LEFT JOIN (
            SELECT
                po.id AS optionId,
                JSON_OBJECT(
                  'size', s.name,
                  'colorName', colors.name
                ) AS optionInfo,
                product.name AS productName,
                product.price AS price
            FROM product_options po
            LEFT JOIN size s ON po.sizeId = s.id
            LEFT JOIN product_color pc ON pc.id = po.productColorId
            LEFT JOIN colors ON pc.colorId = colors.id
            LEFT JOIN product ON product.id = pc.productId 
        ) AS productInfo ON productInfo.optionId = op.productOptionId
        WHERE  DATE(created_at) between ${query}
        GROUP BY o.id
    `);
  },

  async makeOrderProductByProduct(
    orderInfo: CreateOrderDtoByOption,
    userId: number,
  ) {
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    let message = '';
    try {
      const { insertId: shipmentId } = await queryRunner.query(`
        INSERT INTO shipment (
          address,
          detail_address,
          zip_code
        ) VALUES (
          '${orderInfo.address}',
          '${orderInfo.detail_address}',
          '${orderInfo.zip_code}'
        )
      `);

      const { insertId: orderId } = await queryRunner.query(`
          INSERT INTO orders (
              order_number,
              userId,
              total_price,
              shipmentId,
              orderStatusId
          ) VALUES (
            '${orderInfo.orderNumber}',
            ${userId},
            ${orderInfo.price},
            ${shipmentId},
            ${ORDER_STATUS.BEFORE_PAYMENT}
          );
      `);
      console.log(orderId);

      await queryRunner.query(`
          INSERT INTO order_products (
              productOptionId,
              quantity,
              orderId,
              tracking_number,
              shipmentStatusId
          ) VALUES (
              ${orderInfo.optionId},
              ${orderInfo.quantity},
              ${orderId},
              '${orderInfo.trackingNumber}',
              ${SHIPMENT_STATUS.PREPARING_PRODUCT}
          )
      `);

      await queryRunner.query(`
          UPDATE product_options 
          SET stock = stock - ${orderInfo.quantity} 
          WHERE id = ${orderInfo.optionId}
      `);
      await queryRunner.query(`
          UPDATE user
          SET points = points - ${orderInfo.price}
          WHERE id = ${userId}
      `);
      await queryRunner.query(`
          UPDATE orders
          SET orderStatusId = ${ORDER_STATUS.PAID}
          WHERE id = ${orderId}
      `);
      await queryRunner.commitTransaction();
      message = 'ORDER_SUCCESS';
      console.log('dld');
    } catch (err) {
      console.error(err);
      await queryRunner.rollbackTransaction();
      message = 'ERROR_IN_THE_MIDDLE_OF_ORDER';
    } finally {
      await queryRunner.release();
      return message;
    }
  },

  async orderHistoryFilter(): Promise<OrderHistoryFilter[]> {
    return OrderRepository.query(`
        SELECT
          name,
          filter
        FROM order_status
    `);
  },
  async checkOrder(orderId: number) {
    return OrderRepository.query(`
        SELECT
          userId,
          orderStatusId
        FROM orders
        WHERE id = ${orderId}
    `);
  },
  async withdrawOrder(orderId: number, userid: number) {
    let returnMessage: string | undefined;
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const orderProducts = await queryRunner.query(`
        SELECT
          op.id AS orderProductId,
          shipmentStatusId,
          op.productOptionId,
          p.price * quantity AS priceByOption,
          quantity
        FROM order_products op
        LEFT JOIN product_options ON op.productOptionId = product_options.id
        LEFT JOIN product_color ON product_options.productColorId = product_color.id
        LEFT JOIN product p ON product_color.productId = p.id
        WHERE op.orderId = ${orderId}
      `);
      const orderShippingProceeded = orderProducts.filter(
        (el: ProductsByOrder) =>
          el.shipmentStatusId === SHIPMENT_STATUS.SHIPPINGINPROGRESS ||
          el.shipmentStatusId == SHIPMENT_STATUS.SHIPPING_COMPLETED,
      );
      const orderBeforeShipping = orderProducts.filter(
        (el: ProductsByOrder) =>
          el.shipmentStatusId === SHIPMENT_STATUS.PREPARING_PRODUCT,
      );

      if (orderBeforeShipping.length === orderProducts.length) {
        orderBeforeShipping.forEach((el: ProductsByOrder) => {
          queryRunner.query(`
                UPDATE order_products
                SET shipmentStatusId = ${SHIPMENT_STATUS.REFUND_COMPLETED}
                WHERE id = ${el.orderProductId}
          `);

          queryRunner.query(`
                UPDATE product_options
                SET stock = stock + ${el.quantity}
                WHERE id = ${el.productOptionId}
          `);
        });

        const refundPoint = orderBeforeShipping.reduce(
          (acc: number, curr: ProductsByOrder) => curr.priceByOption + acc,
          0,
        );

        await queryRunner.query(`
            UPDATE user
            SET points = points + ${refundPoint}
            WHERE id = ${userid}
        `);

        await queryRunner.query(`
            UPDATE orders
            SET orderStatusId = ${ORDER_STATUS.REFUNDED}
            WHERE id = ${orderId}
        `);

        returnMessage = 'ORDER_CANCLED';
      } else if (orderShippingProceeded.length === orderProducts.length) {
        orderShippingProceeded.forEach((el: ProductsByOrder) => {
          queryRunner.query(`
              UPDATE order_products
              SET shipmentStatusId = ${SHIPMENT_STATUS.REFUND_REQUESTED}
              WHERE id = ${el.orderProductId}
          `);

          queryRunner.query(`
              UPDATE product_options
              SET stock = stock + ${el.quantity}
              WHERE id = ${el.productOptionId}
          `);
        });

        await queryRunner.query(`
            UDATE orders
            SET orderStatusId = ${ORDER_STATUS.REFUND_REQUESTED}
            WHERE id = ${orderId}
        `);

        returnMessage = 'REFUND_REQUESTED';
      } else {
        throw new HttpException(
          'CANNOT_CANCLE_ALL_PRODUCTS',
          HttpStatus.FORBIDDEN,
        );
      }

      await queryRunner.commitTransaction();
    } catch (err) {
      console.error(err);
      returnMessage = err.message;
      queryRunner.rollbackTransaction;
    } finally {
      await queryRunner.release();
      return returnMessage;
    }
  },
  async checkOrderOwner(orderProductId: number) {
    return OrderRepository.query(`
        SELECT
        	o.id AS orderId,
        	o.userId
        FROM order_products op
        LEFT JOIN orders o ON op.orderId = o.id
        WHERE op.id = ${orderProductId}
    `);
  },
  async checkShipmentStatus(
    orderProductId: number,
  ): Promise<Pick<ProductsByOrder, 'shipmentStatusId'>[]> {
    return OrderRepository.query(`
        SELECT
            shipmentStatusId 
        FROM order_products
        WHERE id = ${orderProductId}
    `);
  },
  async withdrawOrderByOption(
    orderProductId: number,
    userId: number,
  ): Promise<void> {
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      queryRunner.query(`
        UPDATE order_products
        SET shipmentStatusId = ${SHIPMENT_STATUS.ORDER_CANCLED}
        WHERE id = ${orderProductId}
      `);

      const [priceInfoToResetUserPoint]: Pick<
        ProductsByOrder,
        'priceByOption'
      >[] = await queryRunner.query(`
        SELECT
          p.price * quantity AS priceByOption
        FROM order_products op
        LEFT JOIN product_options ON op.productOptionId = product_options.id
        LEFT JOIN product_color ON product_options.productColorId = product_color.id
        LEFT JOIN product p ON product_color.productId = p.id
      `);

      queryRunner.query(`
          UPDATE user
          SET points = points + ${priceInfoToResetUserPoint.priceByOption}
          WHERE id = ${userId}
      `);
      await queryRunner.commitTransaction();
    } catch (err) {
      console.error(err);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  },
  async changeStatusForRefundRequestByProduct(orderProductId: number) {
    return OrderRepository.query(`
        UPDATE order_products
        SET shipmentStatusId = ${SHIPMENT_STATUS.REFUND_REQUESTED}
        WHERE id = ${orderProductId}
    `);
  },
  async getOrderInfo(cartIdList: number[]) {
    return OrderRepository.query(`
        SELECT
        	carts.id AS cartId,
        	p.name,
        	thumbnail,
        	quantity * price AS priceByProduct,
        	quantity,
        	c.name AS color,
        	s.name AS size
        FROM carts
        LEFT JOIN product_options po ON carts.optionId = po.id
        LEFT JOIN size s ON po.sizeId = s.id
        LEFT JOIN product_color pc ON po.productColorId = pc.id
        LEFT JOIN colors c ON c.id = pc.colorId
        LEFT JOIN product p ON pc.productId = p.id
        WHERE carts.id IN (${cartIdList})
    `);
  },
});

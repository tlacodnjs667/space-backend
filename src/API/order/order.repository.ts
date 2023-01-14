import { AppDataSource } from 'src/config/data-source';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from '../../entities/order.entity';

export const orderRepository = AppDataSource.getRepository(Order).extend({
  async makeOrderProduct(orderInfo: CreateOrderDto): Promise<void> {
    const queryRunner = AppDataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      queryRunner.commitTransaction();
      const { inserId } = await queryRunner.query(`
        INSERT INTO orders (
            order_number,
            userId,
            total_price
        ) VALUES (
            ${orderInfo.orderNumber},
            ${orderInfo.userId},
            ${orderInfo.price}
        );
  `);

      //   await queryRunner.
    } catch (err) {
      console.error(err);
    } finally {
      await queryRunner.release();
    }
  },
});

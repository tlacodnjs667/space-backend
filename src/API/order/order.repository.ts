import { AppDataSource } from 'src/config/database-config';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from '../../entities/order.entity';

export const orderRepository = AppDataSource.getRepository(Order).extend({
  async makeOrderProduct(
    orderInfo: CreateOrderDto,
    userId: number,
  ): Promise<void> {
    const queryRunner = AppDataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      queryRunner.commitTransaction();

      //   await queryRunner.
    } catch (err) {
      console.error(err);
      queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  },
});

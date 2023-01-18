import { AppDataSource } from 'src/config/database-config';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from '../../entities/order.entity';

export const orderRepository = AppDataSource.getRepository(Order).extend({
  async makeOrderProduct(orderInfo: CreateOrderDto): Promise<void> {
    const queryRunner = AppDataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      queryRunner.commitTransaction();

      //   await queryRunner.
    } catch (err) {
      console.error(err);
    } finally {
      await queryRunner.release();
    }
  },
});

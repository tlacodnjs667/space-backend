import { AppDataSource } from 'src/config/database-config';
import { Cart } from 'src/entities/cart.entity';

export const CartRepository = AppDataSource.getRepository(Cart).extend({
  async createCart() {
    return CartRepository.query(``);
  },

  // async deleteAllCarts() {},
});

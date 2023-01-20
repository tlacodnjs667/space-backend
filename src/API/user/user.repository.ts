import { AppDataSource } from 'src/config/database-config';
import { User } from 'src/entities/user.entity';
import { ReturnCreated } from '../order/orderInterface';

export const UserRepository = AppDataSource.getRepository(User).extend({
  async createUser(
    queryForKeys: string,
    queryForValues: string,
  ): Promise<ReturnCreated> {
    return UserRepository.query(`
        INSERT INTO USER ( 
          ${queryForKeys}
        ) VALUES ( 
          ${queryForValues} 
        );
    `);
  },

  async checkUserInDB(email: string): Promise<ValidatedUser[]> {
    return UserRepository.query(`
        SELECT
          id,
          email,
          password
        FROM user
        WHERE email = '${email}'
    `);
  },
  async checkValidation(userId: number): Promise<ValidatedUser[]> {
    return UserRepository.query(`
        SELECT
          id,
          point
        FROM user
        WHERE id = ${userId}
    `);
  },

  async createShipmentInfo(
    address: string,
    detail_address: string,
    zip_code: string,
  ) {
    return UserRepository.query(`
      INSERT INTO shipment (
        address,
        detail_address,
        zip_code
      ) VALUES (
        ${address},
        ${detail_address},
        ${zip_code}
      )
    `);
  },

  async getUserPoint(userId: number) {
    return UserRepository.query(`
        SELECT
          id,
          points
        FROM user
        WHERE id = ${userId}
    `);
  },
});

interface ValidatedUser {
  id: number;
  email: string;
  password: string;
  gender?: string;
}

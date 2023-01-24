import { AppDataSource } from 'src/config/database-config';
import { User } from 'src/entities/user.entity';
import { ReturnCreated } from '../order/IOrderInterface';
import { ValidatedUser } from './IUserInterface';

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

  async checkUserInDB(query: string): Promise<ValidatedUser[]> {
    return UserRepository.query(`
        SELECT
          id,
          email,
          password
        FROM user
        WHERE ${query}
    `);
  },
  async checkGender(userId: number): Promise<ValidatedUser[]> {
    return UserRepository.query(`
        SELECT
          id,
          email,
          gender
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
  async getUserInfoForOrder(userId: number) {
    return UserRepository.query(`
        SELECT 
          user.name,
          user.email,
          user.phone,
          user.points,
          s.address,
          s.detail_address,
          s.zip_code
        FROM user
        LEFT JOIN shipment s ON s.id = user.shipmentId
        WHERE user.id = ${userId}
    `);
  },
  getUserInfoToChange(userId: number) {
    return UserRepository.query(`
        SELECT 
          email,
          birthday,
          nickname,
          thumbnail,
          gender,
          phone
        FROM user
        WHERE user.id = ${userId}
    `);
  },
  async updateUserInfo(userId: number, queryToChangeData: string[]) {
    return UserRepository.query(`
      UPDATE user
      SET ${queryToChangeData.join(', ')}
      WHERE id = ${userId}
    `);
  },
});

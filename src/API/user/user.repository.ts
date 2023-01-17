import { AppDataSource } from 'src/config/database-config';
import { User } from 'src/entities/user.entity';
import { ReturnCreated } from './dto/create-user.dto';

export const UserRepository = AppDataSource.getRepository(User).extend({
  async createUser(
    queryForKeys: string,
    queryForValues: string,
  ): Promise<ReturnCreated> {
    return UserRepository.query(`
        INSERT INTO USER ( ${queryForKeys} ) VALUES ( ${queryForValues} );
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
  async checkValidation(
    userId: number,
    email: string,
  ): Promise<Pick<ValidatedUser, 'id'>[]> {
    return UserRepository.query(`
        SELECT
          id
        FROM user
        WHERE id = '${userId} AND email = ${email}'
    `);
  },
  async kakaoLogin(token: string) {},
});

interface ValidatedUser {
  id: number;
  email: string;
  password: string;
}

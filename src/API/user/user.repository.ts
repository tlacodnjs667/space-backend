import { AppDataSource } from 'src/config/data-source';
import { User } from 'src/entities/user.entity';

export const userRepository = AppDataSource.getRepository(User).extend({
  async createUser(
    queryForKeys: string,
    queryForValues: string,
  ): Promise<void> {
    return userRepository.query(`
        INSERT INTO USER ( ${queryForKeys} ) VALUES ( ${queryForValues} );
    `);
  },

  async checkUserInDB(email: string) {
    return userRepository.query(`
        SELECT
          id,
          email,
          password
        FROM user
        WHERE email = '${email}'
    `);
  },
});

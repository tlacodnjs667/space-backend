import { MigrationInterface, QueryRunner } from 'typeorm';

export class createLikesTbl1672328946816 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE likes (
                id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                product_id INT NOT NULL,
                user_id INT NOT NULL,
                FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            );
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE likes;
    `);
  }
}

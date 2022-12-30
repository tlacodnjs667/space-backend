import { MigrationInterface, QueryRunner } from 'typeorm';

export class createOrdersTbl1672383123155 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE orders (
                id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                order_number VARCHAR(500) NOT NULL,
                total_price INT NOT NULL,
                user_id INT NULL,
                order_status_id INT NOT NULL,
                FOREIGN KEY (user_id) REFERENCES users(id),
                FOREIGN KEY (order_status_id) REFERENCES order_status(id)
            )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE orders;
        `);
  }
}

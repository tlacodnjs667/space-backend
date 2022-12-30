import { MigrationInterface, QueryRunner } from 'typeorm';

export class createShiptmentsTbl1672383753225 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE shipments (
                id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                address_name VARCHAR(100) NOT NULL,
                address VARCHAR(100) NOT NULL,
                detail_address VARCHAR(100) NOT NULL,
                order_id INT NOT NULL,
                FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
            )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP TABLE order_products;
    `);
  }
}

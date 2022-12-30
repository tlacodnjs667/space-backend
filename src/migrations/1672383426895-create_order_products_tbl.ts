import { MigrationInterface, QueryRunner } from 'typeorm';

export class createOrderProductsTbl1672383426895 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE order_products (
                id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                shipping_company VARCHAR(100) NOT NULL,
                tracking_number VARCHAR(500) NOT NULL,
                order_id INT NOT NULL,
                shipment_status_id INT NOT NULL,
                product_option_id INT NULL,
                FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
                FOREIGN KEY (shipment_status_id) REFERENCES shipment_status(id) ON DELETE CASCADE,
                FOREIGN KEY (product_option_id) REFERENCES product_option(id)
            )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP TABLE order_products;
    `);
  }
}

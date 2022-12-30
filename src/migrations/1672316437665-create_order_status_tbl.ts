import { MigrationInterface, QueryRunner } from 'typeorm';

export class createOrderStatusTbl1672316437665 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE order_status (
            id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(40) NOT NULL
        );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP TABLE order_status;
    `);
  }
}

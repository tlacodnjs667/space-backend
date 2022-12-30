import { MigrationInterface, QueryRunner } from 'typeorm';

export class createShipmentStatusTbl1672328013834
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE shipment_status (
                id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(40) NOT NULL
            )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP TABLE shipment_status;
    `);
  }
}

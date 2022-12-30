import { MigrationInterface, QueryRunner } from 'typeorm';

export class createCodyProductTbl1672377350549 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE cody_product (
                id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                cody_id INT NOT NULL,
                product_id INT NOT NULL,
                FOREIGN KEY (cody_id) REFERENCES weekly_cody(id) ON DELETE CASCADE,
                FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
            );
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE cody_product;`);
  }
}

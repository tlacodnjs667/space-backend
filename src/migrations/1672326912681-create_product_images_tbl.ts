import { MigrationInterface, QueryRunner } from 'typeorm';

export class createProductImagesTbl1672326912681 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE product_images (
            id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
            product_id INT NOT NULL,
            img_url VARCHAR(1000) NOT NULL
        );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP TABLE product_images;
    `);
  }
}

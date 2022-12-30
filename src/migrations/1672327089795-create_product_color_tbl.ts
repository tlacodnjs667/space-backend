import { MigrationInterface, QueryRunner } from 'typeorm';

export class createProductColorTbl1672327089795 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE product_color (
            id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
            product_id INT NOT NULL,
            color_id INT NOT NULL,
            FOREIGN KEY (product_id) REFERENCES products(id),
            FOREIGN KEY (color_id) REFERENCES colors(id)
        );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP TABLE product_colors;
    `);
  }
}

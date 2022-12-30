import { MigrationInterface, QueryRunner } from 'typeorm';

export class createProductOptionsTbl1672327538006
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE product_option (
                id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                size_id INT NOT NULL,
                product_color_id INT NOT NULL,
                stock INT NOT NULL DEFAULT 0,
                top INT NULL,
                chest INT NULL,
                sleeve_length INT NULL,
                shoulder INT NULL,
                bottom INT NULL,
                hem INT NULL,
                waist_line INT NULL,
                hip_line INT NULL,
                FOREIGN KEY (size_id) REFERENCES size(id) ON DELETE CASCADE,
                FOREIGN KEY (product_color_id) REFERENCES product_color(id) ON DELETE CASCADE
            )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP TABLE product_option;
    `);
  }
}

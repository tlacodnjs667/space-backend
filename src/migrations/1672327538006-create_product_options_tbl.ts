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
                stock INT NOT NULL DEFAULT 15,
                top DECIMAL(4,1) NULL,
                chest DECIMAL(4,1) NULL,
                sleeve_length DECIMAL(4,1) NULL,
                shoulder DECIMAL(4,1) NULL,
                bottom DECIMAL(4,1) NULL,
                hem DECIMAL(4,1) NULL,
                waist_line DECIMAL(4,1) NULL,
                hip_line DECIMAL(4,1) NULL,
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

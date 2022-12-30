import { MigrationInterface, QueryRunner } from 'typeorm';

export class createSnapsTbl1672328133160 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE snaps (
                id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                model_name VARCHAR(40) NOT NULL,
                model_height INT NOT NULL,
                model_weight INT NOT NULL,
                cloth_color VARCHAR(40) NOT NULL, 
                cloth_size VARCHAR(40) NOT NULL, 
                item_id INT NOT NULL,
                product_id INT NOT NULL,
                FOREIGN KEY (item_id) REFERENCES items(id) ON DELETE CASCADE,
                FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
            );
        `);
  }
  //////CLOTH COLOR => COLOR TABLE에서 가져올꺼야 아니면 뭐야!
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE snaps;
    `);
  }
}

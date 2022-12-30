import { MigrationInterface, QueryRunner } from 'typeorm';

export class createLookbookProductTbl1672377554336
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE lookbook_product (
            id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
            lookbook_id INT NOT NULL,
            product_id INT NOT NULL,
            FOREIGN KEY (lookbook_id) REFERENCES lookbooks(id) ON DELETE CASCADE,
            FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
        );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP TABLE lookbook_product;
    `);
  }
}

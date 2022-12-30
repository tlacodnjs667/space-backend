import { MigrationInterface, QueryRunner } from 'typeorm';

export class createLookbookProductsTbl1672326492555
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE products (    
                id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                thumbnail VARCHAR(1000) NOT NULL,
                description VARCHAR(1000) NOT NULL,
                price INT NOT NULL,
                created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
                admin_id INT NOT NULL,
                item_id INT NOT NULL,
                FOREIGN KEY (admin_id) REFERENCES admins(id) ON DELETE CASCADE,
                FOREIGN KEY (item_id) REFERENCES items(id) ON DELETE CASCADE
            )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP TABLE products;
    `);
  }
}

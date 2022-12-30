import { MigrationInterface, QueryRunner } from 'typeorm';

export class createLookbookImagesTbl1672326275898
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE lookbook_images(
                id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                image VARCHAR(1000) NOT NULL,
                lookbook_id INT NOT NULL,
                FOREIGN KEY (lookbook_id) REFERENCES lookbooks(id) ON DELETE CASCADE
            );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP TABLE lookbook_images;
    `);
  }
}

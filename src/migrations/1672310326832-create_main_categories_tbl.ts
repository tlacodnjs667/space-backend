import { MigrationInterface, QueryRunner } from 'typeorm';

export class createMainCategoriesTbl1672310326832
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE main_categories (
            id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(40) NOT NULL
        );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP TABLE main_categories;
    `);
  }
}

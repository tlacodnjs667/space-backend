import { MigrationInterface, QueryRunner } from 'typeorm';

export class createSubCategoriesTbl1672310333590 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE sub_categories (
            id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(40) NOT NULL
        );
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP TABLE sub_categories;
    `);
  }
}

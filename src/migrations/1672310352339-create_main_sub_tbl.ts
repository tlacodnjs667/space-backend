import { MigrationInterface, QueryRunner } from 'typeorm';

export class createMainSubTbl1672310352339 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE main_sub_categories (
          id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
          main_id INT NOT NULL,
          sub_id INT NOT NULL,
          FOREIGN KEY (main_id) REFERENCES main_categories(id),
          FOREIGN KEY (sub_id) REFERENCES sub_categories(id)
        );
    `);
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP TABLE main_sub_categories;
    `);
  }
}

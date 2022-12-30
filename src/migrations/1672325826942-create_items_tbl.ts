import { MigrationInterface, QueryRunner } from 'typeorm';

export class createItemsTbl1672325826942 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE items (
                id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(40) NOT NULL,
                main_sub_id INT NOT NULL,
                FOREIGN KEY (main_sub_id) REFERENCES main_sub_categories(id)
            );
        `);
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE items;
    `);
  }
}

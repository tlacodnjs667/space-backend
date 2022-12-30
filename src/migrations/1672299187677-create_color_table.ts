import { MigrationInterface, QueryRunner } from 'typeorm';

export class createColorTable1672299187677 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE colors (
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(40) NOT NULL
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE colors;
    `);
  }
}

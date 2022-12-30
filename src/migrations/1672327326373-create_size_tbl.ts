import { MigrationInterface, QueryRunner } from 'typeorm';

export class createSizeTbl1672327326373 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE size (
                id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(40) NOT NULL
            );
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE size;
        `);
  }
}

import { MigrationInterface, QueryRunner } from 'typeorm';

export class createWeeklyStylesTbl1672329155294 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE weekly_style (
                id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(100) NOT NULL
            );
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE likes;
    `);
  }
}

import { MigrationInterface, QueryRunner } from 'typeorm';

export class createHashtagsTbl1672300547482 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE hashtags (
                id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(30) NOT NULL
            );
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE hashtags;
        `);
  }
}

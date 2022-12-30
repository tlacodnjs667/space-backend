import { MigrationInterface, QueryRunner } from 'typeorm';

export class createEventStatusTbl1672300342968 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE event_status (
                id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(30) NOT NULL
            );
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE event_status;`);
  }
}

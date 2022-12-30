import { MigrationInterface, QueryRunner } from 'typeorm';

export class createLaunchingCalendarTbl1672326038746
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE launching_calendar (
                id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(300) NOT NULL,
                email VARCHAR(300) NOT NULL,
                thumbnail VARCHAR(1000) NOT NULL,
                content VARCHAR(1000) NOT NULL,
                image VARCHAR(1000) NOT NULL,
                likeCounting INT NOT NULL DEFAULT 0,
                admin_id INT NOT NULL,
                FOREIGN KEY (admin_id) REFERENCES admins(id) ON DELETE CASCADE
            );
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE launching_calendar;
    `);
  }
}

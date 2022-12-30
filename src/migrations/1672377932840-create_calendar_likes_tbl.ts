import { MigrationInterface, QueryRunner } from 'typeorm';

export class createCalendarLikesTbl1672377932840 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE calendar_likes (
            id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
            user_id INT NOT NULL,
            launching_calendar_id INT NOT NULL,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
            FOREIGN KEY (launching_calendar_id) REFERENCES launching_calendars(id) ON DELETE CASCADE
        );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE calendar_likes
    `);
  }
}

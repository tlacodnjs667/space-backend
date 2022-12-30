import { MigrationInterface, QueryRunner } from 'typeorm';

export class createCalendarCommentsTbl1672378115608
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE calendar_comments (
            id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
            comment VARCHAR(500) NOT NULL,
            calendar_id INT NOT NULL,
            user_id INT NOT NULL,
            FOREIGN KEY (calendar_id) REFERENCES launching_calendar(id) ON DELETE CASCADE,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP TABLE calendar_comments;
    `);
  }
}

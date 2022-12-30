import { MigrationInterface, QueryRunner } from 'typeorm';

export class createEventCommentTbl1672382187692 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE event_comments (
            id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
            comment VARCHAR(1000) NOT NULL,
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            user_id INT NOT NULL,
            event_id INT NOT NULL,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
            FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
        );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP TABLE event_comments;
    `);
  }
}

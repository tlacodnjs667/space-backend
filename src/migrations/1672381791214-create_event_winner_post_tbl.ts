import { MigrationInterface, QueryRunner } from 'typeorm';

export class createEventWinnerPostTbl1672381791214
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE event_winner_posts (
            id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(100) NOT NULL,
            description VARCHAR(2000) NOT NULL,
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            seeing_count INT NOT NULL DEFAULT 0,
            admin_id INT NOT NULL,
            FOREIGN KEY (admin_id) REFERENCES admins(id)
        );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP TABLE event_winner_posts;
    `);
  }
}

import { MigrationInterface, QueryRunner } from 'typeorm';

export class createEventTbl1672316591504 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE events (
                id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                admin_id INT NOT NULL,
                event_status_id INT NOT NULL,
                title VARCHAR(200) NOT NULL,
                content VARCHAR(1000) NOT NULL,
                thumbnail VARCHAR(1000) NULL,
                template VARCHAR(1000) NULL,
                start_date DATETIME NOT NULL,
                end_date DATETIME NOT NULL,
                created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (admin_id) REFERENCES admins(id) ON DELETE CASCADE,
                FOREIGN KEY (event_status_id) REFERENCES event_status(id) ON DELETE CASCADE
            );
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE events;
        `);
  }
}

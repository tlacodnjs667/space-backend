import { MigrationInterface, QueryRunner } from 'typeorm';

export class createWeeklyCodyTbl1672329254915 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE weekly_cody (
                id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                thumbnail VARCHAR(1000) NOT NULL,
                weekly_style_id INT NOT NULL, 
                admin_id INT NOT NULL,
                FOREIGN KEY (weekly_style_id) REFERENCES weekly_style(id),
                FOREIGN KEY (admin_id) REFERENCES admins(id)
            );
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE weekly_cody;
        `);
  }
}

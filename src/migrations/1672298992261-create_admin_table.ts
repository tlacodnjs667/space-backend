import { MigrationInterface, QueryRunner } from 'typeorm';

export class createAdminTable1672298992261 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE admins (
            id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            position VARCHAR(100) NOT NULL
        );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`DROP TABLE admins`);
  }
}

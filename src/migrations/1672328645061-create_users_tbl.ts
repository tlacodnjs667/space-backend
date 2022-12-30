import { MigrationInterface, QueryRunner } from 'typeorm';

export class createUsersTbl1672328645061 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE users (
                id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(50) NOT NULL,
                nickname VARCHAR(50) NOT NULL,
                kakao_id VARCHAR(200) NULL,
                email VARCHAR(200) NOT NULL,
                birthday DATE NULL,
                thumbnail VARCHAR(1000) NOT NULL UNIQUE,
                gender VARCHAR(30) NULL,
                phone VARCHAR(100) NOT NULL            
            );
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE users;
    `);
  }
}

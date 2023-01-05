import { MigrationInterface, QueryRunner } from 'typeorm';

export class createReviewTbl1672329496046 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE reviews (
            id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
            product_id INT NOT NULL,
            user_id INT NOT NULL,
            title VARCHAR(100) NOT NULL,
            content VARCHAR(500) NOT NULL,
            thumbnail VARCHAR(1000) NULL,
            stars INT NOT NULL,
            FOREIGN KEY (product_id) REFERENCES products(id),
            FOREIGN KEY (user_id) REFERENCES users(id)
        );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP TABLE reviews;
    `);
  }
}

import { MigrationInterface, QueryRunner } from 'typeorm';

export class createReviewImagesTbl1672329822720 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE review_images (
            id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
            review_id INT NOT NULL,
            thumbnail VARCHAR(1000) NOT NULL,
            FOREIGN KEY (review_id) REFERENCES reviews(id) ON DELETE CASCADE
        );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP TABLE review_images;
    `);
  }
}

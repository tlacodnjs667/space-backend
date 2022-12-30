import { MigrationInterface, QueryRunner } from 'typeorm';

export class createReviewLikesTbl1672329952363 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE review_likes (
            id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
            user_id INT NOT NULL,
            review_id INT NOT NULL,
            isHelpful BOOLEAN NOT NULL,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
            FOREIGN KEY (review_id) REFERENCES reviews(id) ON DELETE CASCADE
        );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE review_likes;
        `);
  }
}

import { MigrationInterface, QueryRunner } from 'typeorm';

export class createTagCodyTbl1672378309171 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE tag_cody (
                id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                cody_id INT NOT NULL,
                tag_id INT NOT NULL,
                FOREIGN KEY (cody_id) REFERENCES weekly_cody(id) ON DELETE CASCADE,
                FOREIGN KEY (tag_id) REFERENCES hashtags(id) ON DELETE CASCADE
            )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP TABLE tag_cody;
    `);
  }
}

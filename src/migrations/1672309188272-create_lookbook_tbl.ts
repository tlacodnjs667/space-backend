import { MigrationInterface, QueryRunner } from 'typeorm';

export class createLookbookTbl1672309188272 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE lookbooks (
                id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                admin_id INT NOT NULL,
                title VARCHAR(100) NOT NULL,
                sub_title VARCHAR(100) NOT NULL,
                content VARCHAR(1000) NOT NULL,
                thumbnail VARCHAR(1000) NOT NULL,
                FOREIGN KEY (admin_id) REFERENCES admins(id)
            );
    `);
  }
  //   FOREIGN KEY (city_id) REFERENCES cities(id)

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    DROP TABLE lookbooks;
    `);
  }
}

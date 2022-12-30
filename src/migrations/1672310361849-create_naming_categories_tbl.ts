import { MigrationInterface, QueryRunner } from 'typeorm';

export class createNamingCategoriesTbl1672310361849
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE naming_categories (
                id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(40) NOT NULL,
                main_id INT NOT NULL,
                FOREIGN KEY (main_id) REFERENCES main_categories(id)
            );
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
            DROP TABLE naming_categories;
        `);
  }
}

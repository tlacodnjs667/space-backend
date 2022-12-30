import { MigrationInterface, QueryRunner } from "typeorm"

export class createAdminPage1672314008593 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE admins (
                id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(300) NOT NULL
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}

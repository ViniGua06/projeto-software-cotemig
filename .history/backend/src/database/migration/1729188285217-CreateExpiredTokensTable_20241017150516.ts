import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateExpiredTokensTable1729188285217 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name:expiredtokens
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}

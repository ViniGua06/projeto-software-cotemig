import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateAwareTable1724350030264 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "aware",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isGenerated: true,
                    generationStrategy: "increment",
                    isPrimary: true,
                }, 
                {
                    name: "notice_id",
                    type: "int",
                    isNullable: false,
                }, 
                {
                    name: "user_id",
                    type: "int",
                    isNullable: false,
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}

import { Column, MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddAwareColumnToNoticesTable1724348453411 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("notice", new TableColumn({
            name: "aware",
            type: "int",
            isNullable: false
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}

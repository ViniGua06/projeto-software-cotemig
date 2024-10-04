import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddDailyVerseColumnToChurchsTable1727985914297 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("church", new TableColumn({
            name: "daily_verse",
            type: "varchar",
            isNullable: true,
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}

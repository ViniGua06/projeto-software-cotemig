import { Column, MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddChurchIdColumnToEventTable1726775844078
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "event",
      new TableColumn({
        name: "church_id",
        type: "varchar",
        isNullable: false,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}

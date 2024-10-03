import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateChurchAccountTable1727955263820
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "churchaccount",
        columns: [
          {
            name: "id",
            type: "int",
            isGenerated: true,
            generationStrategy: "increment",
            isPrimary: true,
          },
          {
            name: "church_id",
            type: "int",
            isNullable: false,
          },
          {
            name: "account_id",
            type: "varchar",
            isNullable: false,
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}

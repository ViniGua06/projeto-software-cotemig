import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateEventsTable1726775432257 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "event",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            generationStrategy: "increment",
            isGenerated: true,
          },
          {
            name: "name",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "details",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "start",
            type: "timestamp",
            isNullable: false,
          },
          {
            name: "end",
            type: "timestamp",
            isNullable: false,
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}

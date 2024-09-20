import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateMessagesTable1719946876506 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "message",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "text",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "user_id",
            type: "int",
            isNullable: false,
          },
          {
            name: "church_id",
            type: "int",
            isNullable: false,
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}

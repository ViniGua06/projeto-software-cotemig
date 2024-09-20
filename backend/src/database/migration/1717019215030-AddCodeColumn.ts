import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddCodeColumn1717019215030 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "church",
      new TableColumn({
        name: "code",
        type: "varchar",
        isNullable: true,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}

import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddRoleColumn1717007495448 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "user_church",
      new TableColumn({
        name: "role",
        type: "varchar",
        isNullable: true,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}

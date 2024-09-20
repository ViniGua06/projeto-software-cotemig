import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddChurchPhotoColumn1716939198106 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "church",
      new TableColumn({
        name: "photo",
        type: "varchar",
        isNullable: true,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}

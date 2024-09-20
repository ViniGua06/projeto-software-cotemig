import { MigrationInterface, QueryRunner } from "typeorm";

export class RenameChurchColumnName1716938540834 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameColumn("church", "church_name", "name");
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}

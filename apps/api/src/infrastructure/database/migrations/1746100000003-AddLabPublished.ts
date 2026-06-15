import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddLabPublished1746100000003 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "lab_items" ADD COLUMN "published" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `UPDATE "lab_items" SET "published" = true WHERE "status" <> 'Archivado'`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_lab_items_published" ON "lab_items" ("published")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX IF EXISTS "IDX_lab_items_published"`);
    await queryRunner.query(`ALTER TABLE "lab_items" DROP COLUMN "published"`);
  }
}

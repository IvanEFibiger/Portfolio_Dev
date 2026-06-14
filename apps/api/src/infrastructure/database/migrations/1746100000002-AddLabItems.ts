import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddLabItems1746100000002 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "lab_items" (
        "id" uuid NOT NULL DEFAULT gen_random_uuid(),
        "lab_number" varchar NOT NULL,
        "title" varchar NOT NULL,
        "slug" varchar NOT NULL,
        "description" text NOT NULL,
        "status" varchar NOT NULL DEFAULT 'Explorando',
        "stack" jsonb NOT NULL DEFAULT '[]',
        "learning" text NOT NULL,
        "sort_order" integer NOT NULL DEFAULT 0,
        "created_at" timestamptz NOT NULL DEFAULT now(),
        "updated_at" timestamptz NOT NULL DEFAULT now(),
        CONSTRAINT "PK_lab_items" PRIMARY KEY ("id"),
        CONSTRAINT "UQ_lab_items_lab_number" UNIQUE ("lab_number"),
        CONSTRAINT "UQ_lab_items_slug" UNIQUE ("slug")
      )
    `);

    await queryRunner.query(
      `CREATE INDEX IF NOT EXISTS "IDX_lab_items_status" ON "lab_items" ("status")`,
    );
    await queryRunner.query(
      `CREATE INDEX IF NOT EXISTS "IDX_lab_items_sort_order" ON "lab_items" ("sort_order")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "lab_items"`);
  }
}

import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddMissingColumns1746100000001 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Projects
    await queryRunner.query(`ALTER TABLE "projects" ADD COLUMN IF NOT EXISTS "type" varchar`);
    await queryRunner.query(
      `ALTER TABLE "projects" ADD COLUMN IF NOT EXISTS "operational_status" varchar`,
    );
    await queryRunner.query(`ALTER TABLE "projects" ADD COLUMN IF NOT EXISTS "complexity" varchar`);
    await queryRunner.query(`ALTER TABLE "projects" ADD COLUMN IF NOT EXISTS "context" text`);
    await queryRunner.query(`ALTER TABLE "projects" ADD COLUMN IF NOT EXISTS "objective" text`);
    await queryRunner.query(
      `ALTER TABLE "projects" ADD COLUMN IF NOT EXISTS "restrictions" jsonb NOT NULL DEFAULT '[]'`,
    );
    await queryRunner.query(
      `ALTER TABLE "projects" ADD COLUMN IF NOT EXISTS "technical_decisions" jsonb NOT NULL DEFAULT '[]'`,
    );
    await queryRunner.query(
      `ALTER TABLE "projects" ADD COLUMN IF NOT EXISTS "security" jsonb NOT NULL DEFAULT '[]'`,
    );
    await queryRunner.query(`ALTER TABLE "projects" ADD COLUMN IF NOT EXISTS "result" text`);
    await queryRunner.query(`ALTER TABLE "projects" ADD COLUMN IF NOT EXISTS "learnings" text`);
    await queryRunner.query(`ALTER TABLE "projects" ADD COLUMN IF NOT EXISTS "improvements" text`);
    await queryRunner.query(
      `ALTER TABLE "projects" ADD COLUMN IF NOT EXISTS "highlights" jsonb NOT NULL DEFAULT '[]'`,
    );
    await queryRunner.query(`ALTER TABLE "projects" ADD COLUMN IF NOT EXISTS "role" varchar`);

    // Articles
    await queryRunner.query(`ALTER TABLE "articles" ADD COLUMN IF NOT EXISTS "category" varchar`);
    await queryRunner.query(
      `ALTER TABLE "articles" ADD COLUMN IF NOT EXISTS "tags" jsonb NOT NULL DEFAULT '[]'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Articles
    await queryRunner.query(`ALTER TABLE "articles" DROP COLUMN IF EXISTS "tags"`);
    await queryRunner.query(`ALTER TABLE "articles" DROP COLUMN IF EXISTS "category"`);

    // Projects
    await queryRunner.query(`ALTER TABLE "projects" DROP COLUMN IF EXISTS "role"`);
    await queryRunner.query(`ALTER TABLE "projects" DROP COLUMN IF EXISTS "highlights"`);
    await queryRunner.query(`ALTER TABLE "projects" DROP COLUMN IF EXISTS "improvements"`);
    await queryRunner.query(`ALTER TABLE "projects" DROP COLUMN IF EXISTS "learnings"`);
    await queryRunner.query(`ALTER TABLE "projects" DROP COLUMN IF EXISTS "result"`);
    await queryRunner.query(`ALTER TABLE "projects" DROP COLUMN IF EXISTS "security"`);
    await queryRunner.query(`ALTER TABLE "projects" DROP COLUMN IF EXISTS "technical_decisions"`);
    await queryRunner.query(`ALTER TABLE "projects" DROP COLUMN IF EXISTS "restrictions"`);
    await queryRunner.query(`ALTER TABLE "projects" DROP COLUMN IF EXISTS "objective"`);
    await queryRunner.query(`ALTER TABLE "projects" DROP COLUMN IF EXISTS "context"`);
    await queryRunner.query(`ALTER TABLE "projects" DROP COLUMN IF EXISTS "complexity"`);
    await queryRunner.query(`ALTER TABLE "projects" DROP COLUMN IF EXISTS "operational_status"`);
    await queryRunner.query(`ALTER TABLE "projects" DROP COLUMN IF EXISTS "type"`);
  }
}

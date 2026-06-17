import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddAnalyticsVisitorTracking1746100000004 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "analytics_events" ADD COLUMN "visitor_hash" varchar`);
    await queryRunner.query(
      `ALTER TABLE "analytics_events" ADD COLUMN "is_owner" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_analytics_events_visitor_hash" ON "analytics_events" ("visitor_hash")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX IF EXISTS "IDX_analytics_events_visitor_hash"`);
    await queryRunner.query(`ALTER TABLE "analytics_events" DROP COLUMN "is_owner"`);
    await queryRunner.query(`ALTER TABLE "analytics_events" DROP COLUMN "visitor_hash"`);
  }
}

import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1746100000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "admin_users" (
        "id" uuid NOT NULL DEFAULT gen_random_uuid(),
        "email" varchar NOT NULL,
        "password_hash" varchar NOT NULL,
        "display_name" varchar,
        "role" varchar NOT NULL DEFAULT 'admin',
        "is_active" boolean NOT NULL DEFAULT true,
        "created_at" timestamptz NOT NULL DEFAULT now(),
        "updated_at" timestamptz NOT NULL DEFAULT now(),
        CONSTRAINT "PK_admin_users" PRIMARY KEY ("id"),
        CONSTRAINT "UQ_admin_users_email" UNIQUE ("email")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE "articles" (
        "id" uuid NOT NULL DEFAULT gen_random_uuid(),
        "title" varchar NOT NULL,
        "slug" varchar NOT NULL,
        "excerpt" text NOT NULL,
        "content" jsonb NOT NULL DEFAULT '{}',
        "cover_image_url" varchar,
        "status" varchar NOT NULL DEFAULT 'draft',
        "visibility" varchar NOT NULL DEFAULT 'public',
        "reading_time_minutes" integer,
        "published_at" timestamptz,
        "seo_title" varchar,
        "seo_description" text,
        "created_at" timestamptz NOT NULL DEFAULT now(),
        "updated_at" timestamptz NOT NULL DEFAULT now(),
        CONSTRAINT "PK_articles" PRIMARY KEY ("id"),
        CONSTRAINT "UQ_articles_slug" UNIQUE ("slug")
      )
    `);

    await queryRunner.query(`CREATE INDEX "IDX_articles_status" ON "articles" ("status")`);
    await queryRunner.query(
      `CREATE INDEX "IDX_articles_published_at" ON "articles" ("published_at")`,
    );

    await queryRunner.query(`
      CREATE TABLE "projects" (
        "id" uuid NOT NULL DEFAULT gen_random_uuid(),
        "title" varchar NOT NULL,
        "slug" varchar NOT NULL,
        "summary" text NOT NULL,
        "description" text,
        "problem" text,
        "solution" text,
        "architecture" text,
        "stack" jsonb NOT NULL DEFAULT '[]',
        "status" varchar NOT NULL DEFAULT 'draft',
        "featured" boolean NOT NULL DEFAULT false,
        "repository_url" varchar,
        "demo_url" varchar,
        "cover_image_url" varchar,
        "sort_order" integer NOT NULL DEFAULT 0,
        "created_at" timestamptz NOT NULL DEFAULT now(),
        "updated_at" timestamptz NOT NULL DEFAULT now(),
        CONSTRAINT "PK_projects" PRIMARY KEY ("id"),
        CONSTRAINT "UQ_projects_slug" UNIQUE ("slug")
      )
    `);

    await queryRunner.query(`CREATE INDEX "IDX_projects_status" ON "projects" ("status")`);
    await queryRunner.query(`CREATE INDEX "IDX_projects_sort_order" ON "projects" ("sort_order")`);

    await queryRunner.query(`
      CREATE TABLE "contact_messages" (
        "id" uuid NOT NULL DEFAULT gen_random_uuid(),
        "name" varchar NOT NULL,
        "email" varchar NOT NULL,
        "company" varchar,
        "subject" varchar,
        "message" text NOT NULL,
        "status" varchar NOT NULL DEFAULT 'new',
        "source" varchar,
        "created_at" timestamptz NOT NULL DEFAULT now(),
        "updated_at" timestamptz NOT NULL DEFAULT now(),
        CONSTRAINT "PK_contact_messages" PRIMARY KEY ("id")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE "newsletter_subscribers" (
        "id" uuid NOT NULL DEFAULT gen_random_uuid(),
        "email" varchar NOT NULL,
        "status" varchar NOT NULL DEFAULT 'pending',
        "confirmation_token" varchar,
        "subscribed_at" timestamptz,
        "unsubscribed_at" timestamptz,
        "created_at" timestamptz NOT NULL DEFAULT now(),
        "updated_at" timestamptz NOT NULL DEFAULT now(),
        CONSTRAINT "PK_newsletter_subscribers" PRIMARY KEY ("id"),
        CONSTRAINT "UQ_newsletter_subscribers_email" UNIQUE ("email")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE "analytics_events" (
        "id" uuid NOT NULL DEFAULT gen_random_uuid(),
        "path" varchar NOT NULL,
        "event_type" varchar NOT NULL DEFAULT 'page_view',
        "referrer" varchar,
        "user_agent_hash" varchar,
        "created_at" timestamptz NOT NULL DEFAULT now(),
        CONSTRAINT "PK_analytics_events" PRIMARY KEY ("id")
      )
    `);

    await queryRunner.query(
      `CREATE INDEX "IDX_analytics_events_path" ON "analytics_events" ("path")`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_analytics_events_event_type" ON "analytics_events" ("event_type")`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_analytics_events_created_at" ON "analytics_events" ("created_at")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "analytics_events"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "newsletter_subscribers"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "contact_messages"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "projects"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "articles"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "admin_users"`);
  }
}

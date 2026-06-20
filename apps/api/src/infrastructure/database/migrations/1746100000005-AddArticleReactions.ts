import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddArticleReactions1746100000005 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "article_reactions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "article_id" uuid NOT NULL, "visitor_hash" varchar NOT NULL, "reaction_type" varchar NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_article_reactions" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "article_reactions" ADD CONSTRAINT "FK_article_reactions_article" FOREIGN KEY ("article_id") REFERENCES "articles"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "UQ_article_reactions_article_visitor" ON "article_reactions" ("article_id", "visitor_hash")`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_article_reactions_article_type" ON "article_reactions" ("article_id", "reaction_type")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX IF EXISTS "IDX_article_reactions_article_type"`);
    await queryRunner.query(`DROP INDEX IF EXISTS "UQ_article_reactions_article_visitor"`);
    await queryRunner.query(
      `ALTER TABLE "article_reactions" DROP CONSTRAINT IF EXISTS "FK_article_reactions_article"`,
    );
    await queryRunner.query(`DROP TABLE "article_reactions"`);
  }
}

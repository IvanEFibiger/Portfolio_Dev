import { Article, ArticleStatus, ArticleVisibility } from '../../domain/entities/article.entity';
import { ArticleOrmEntity } from './article.orm-entity';

export class ArticleMapper {
  static toDomain(orm: ArticleOrmEntity): Article {
    return new Article(
      orm.id,
      orm.title,
      orm.slug,
      orm.excerpt,
      orm.content,
      orm.status as ArticleStatus,
      orm.visibility as ArticleVisibility,
      orm.coverImageUrl ?? null,
      orm.readingTimeMinutes ?? null,
      orm.publishedAt ?? null,
      orm.seoTitle ?? null,
      orm.seoDescription ?? null,
      orm.category ?? null,
      orm.tags ?? [],
      orm.createdAt,
      orm.updatedAt,
    );
  }

  static toOrm(domain: Article): Partial<ArticleOrmEntity> {
    return {
      id: domain.id,
      title: domain.title,
      slug: domain.slug,
      excerpt: domain.excerpt,
      content: domain.content,
      status: domain.status,
      visibility: domain.visibility,
      coverImageUrl: domain.coverImageUrl ?? undefined,
      readingTimeMinutes: domain.readingTimeMinutes ?? undefined,
      publishedAt: domain.publishedAt ?? undefined,
      seoTitle: domain.seoTitle ?? undefined,
      seoDescription: domain.seoDescription ?? undefined,
      category: domain.category ?? undefined,
      tags: domain.tags ?? undefined,
    };
  }
}

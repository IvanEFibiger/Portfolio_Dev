import { Inject, Injectable } from '@nestjs/common';
import {
  ARTICLE_REPOSITORY,
  ArticleRepositoryPort,
} from '../../domain/ports/article.repository.port';
import { CreateArticleDto } from '../dto/create-article.dto';
import { Article, ArticleStatus, ArticleVisibility } from '../../domain/entities/article.entity';

@Injectable()
export class CreateArticleUseCase {
  constructor(
    @Inject(ARTICLE_REPOSITORY)
    private readonly articleRepository: ArticleRepositoryPort,
  ) {}

  async execute(dto: CreateArticleDto): Promise<Article> {
    const baseSlug = dto.slug ? this.sanitizeSlug(dto.slug) : this.generateSlug(dto.title);

    const existing = await this.articleRepository.findBySlug(baseSlug);
    const finalSlug = existing ? `${baseSlug}-${Date.now()}` : baseSlug;

    return this.articleRepository.create({
      title: dto.title,
      slug: finalSlug,
      excerpt: dto.excerpt,
      content: dto.content,
      status: (dto.status as ArticleStatus) ?? 'draft',
      visibility: (dto.visibility as ArticleVisibility) ?? 'public',
      coverImageUrl: dto.coverImageUrl ?? null,
      readingTimeMinutes: dto.readingTimeMinutes ?? null,
      publishedAt: null,
      seoTitle: dto.seoTitle ?? null,
      seoDescription: dto.seoDescription ?? null,
      category: dto.category ?? null,
      tags: dto.tags ?? [],
    });
  }

  private generateSlug(title: string): string {
    return title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  }

  private sanitizeSlug(slug: string): string {
    return slug
      .toLowerCase()
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  }
}

import { Inject, Injectable } from '@nestjs/common';
import {
  ARTICLE_REPOSITORY,
  ArticleRepositoryPort,
} from '../../domain/ports/article.repository.port';
import { UpdateArticleDto } from '../dto/update-article.dto';
import { Article, ArticleVisibility } from '../../domain/entities/article.entity';
import { ArticleNotFoundError } from '../../domain/errors/article-not-found.error';

@Injectable()
export class UpdateArticleUseCase {
  constructor(
    @Inject(ARTICLE_REPOSITORY)
    private readonly articleRepository: ArticleRepositoryPort,
  ) {}

  async execute(id: string, dto: UpdateArticleDto): Promise<Article> {
    const article = await this.articleRepository.findById(id);
    if (!article) throw new ArticleNotFoundError(id);

    if (dto.title !== undefined) article.title = dto.title;
    if (dto.slug !== undefined) article.slug = dto.slug;
    if (dto.excerpt !== undefined) article.excerpt = dto.excerpt;
    if (dto.content !== undefined) article.content = dto.content;
    if (dto.coverImageUrl !== undefined) article.coverImageUrl = dto.coverImageUrl;
    if (dto.visibility !== undefined) article.visibility = dto.visibility as ArticleVisibility;
    if (dto.status !== undefined) article.status = dto.status as Article['status'];
    if (dto.readingTimeMinutes !== undefined) article.readingTimeMinutes = dto.readingTimeMinutes;
    if (dto.seoTitle !== undefined) article.seoTitle = dto.seoTitle;
    if (dto.seoDescription !== undefined) article.seoDescription = dto.seoDescription;
    if (dto.category !== undefined) article.category = dto.category;
    if (dto.tags !== undefined) article.tags = dto.tags;

    return this.articleRepository.save(article);
  }
}

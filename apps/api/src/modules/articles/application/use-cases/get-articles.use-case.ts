import { Inject, Injectable } from '@nestjs/common';
import {
  ARTICLE_REPOSITORY,
  ArticleRepositoryPort,
} from '../../domain/ports/article.repository.port';
import { Article } from '../../domain/entities/article.entity';

@Injectable()
export class GetPublicArticlesUseCase {
  constructor(
    @Inject(ARTICLE_REPOSITORY)
    private readonly articleRepository: ArticleRepositoryPort,
  ) {}

  async execute(): Promise<Article[]> {
    return this.articleRepository.findAllPublished();
  }
}

@Injectable()
export class GetAllArticlesUseCase {
  constructor(
    @Inject(ARTICLE_REPOSITORY)
    private readonly articleRepository: ArticleRepositoryPort,
  ) {}

  async execute(): Promise<Article[]> {
    return this.articleRepository.findAll();
  }
}

@Injectable()
export class GetArticleByIdUseCase {
  constructor(
    @Inject(ARTICLE_REPOSITORY)
    private readonly articleRepository: ArticleRepositoryPort,
  ) {}

  async execute(id: string): Promise<Article | null> {
    return this.articleRepository.findById(id);
  }
}

@Injectable()
export class GetArticleBySlugUseCase {
  constructor(
    @Inject(ARTICLE_REPOSITORY)
    private readonly articleRepository: ArticleRepositoryPort,
  ) {}

  async execute(slug: string): Promise<Article | null> {
    const article = await this.articleRepository.findBySlug(slug);
    if (!article || !article.isPubliclyVisible()) return null;
    return article;
  }
}

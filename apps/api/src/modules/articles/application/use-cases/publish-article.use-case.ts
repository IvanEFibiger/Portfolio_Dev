import { Inject, Injectable } from '@nestjs/common';
import {
  ARTICLE_REPOSITORY,
  ArticleRepositoryPort,
} from '../../domain/ports/article.repository.port';
import { Article } from '../../domain/entities/article.entity';
import { ArticleNotFoundError } from '../../domain/errors/article-not-found.error';

@Injectable()
export class PublishArticleUseCase {
  constructor(
    @Inject(ARTICLE_REPOSITORY)
    private readonly articleRepository: ArticleRepositoryPort,
  ) {}

  async execute(id: string): Promise<Article> {
    const article = await this.articleRepository.findById(id);
    if (!article) throw new ArticleNotFoundError(id);

    article.publish();
    return this.articleRepository.save(article);
  }
}

@Injectable()
export class UnpublishArticleUseCase {
  constructor(
    @Inject(ARTICLE_REPOSITORY)
    private readonly articleRepository: ArticleRepositoryPort,
  ) {}

  async execute(id: string): Promise<Article> {
    const article = await this.articleRepository.findById(id);
    if (!article) throw new ArticleNotFoundError(id);

    article.unpublish();
    return this.articleRepository.save(article);
  }
}

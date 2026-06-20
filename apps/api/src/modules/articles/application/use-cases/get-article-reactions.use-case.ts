import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  ARTICLE_REPOSITORY,
  ArticleRepositoryPort,
} from '../../domain/ports/article.repository.port';
import {
  ARTICLE_REACTION_REPOSITORY,
  ArticleReactionRepositoryPort,
  ArticleReactionSummary,
} from '../../domain/ports/article-reaction.repository.port';
import {
  ArticleVisitorFingerprintService,
  VisitorFingerprintContext,
} from './article-visitor-fingerprint.service';

@Injectable()
export class GetArticleReactionsUseCase {
  constructor(
    @Inject(ARTICLE_REPOSITORY)
    private readonly articleRepository: ArticleRepositoryPort,
    @Inject(ARTICLE_REACTION_REPOSITORY)
    private readonly reactionRepository: ArticleReactionRepositoryPort,
    private readonly fingerprints: ArticleVisitorFingerprintService,
  ) {}

  async execute(slug: string, context: VisitorFingerprintContext): Promise<ArticleReactionSummary> {
    const article = await this.articleRepository.findBySlug(slug);
    if (!article || !article.isPubliclyVisible()) {
      throw new NotFoundException('Articulo no encontrado');
    }

    return this.reactionRepository.getSummary(
      article.id,
      this.fingerprints.buildVisitorHash(context),
    );
  }
}

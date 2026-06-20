import { Inject, Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { ArticleReactionType } from '../../domain/entities/article-reaction.entity';
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
export class ReactToArticleUseCase {
  constructor(
    @Inject(ARTICLE_REPOSITORY)
    private readonly articleRepository: ArticleRepositoryPort,
    @Inject(ARTICLE_REACTION_REPOSITORY)
    private readonly reactionRepository: ArticleReactionRepositoryPort,
    private readonly fingerprints: ArticleVisitorFingerprintService,
  ) {}

  async execute(
    slug: string,
    reactionType: ArticleReactionType,
    context: VisitorFingerprintContext,
  ): Promise<ArticleReactionSummary> {
    const article = await this.articleRepository.findBySlug(slug);
    if (!article || !article.isPubliclyVisible()) {
      throw new NotFoundException('Articulo no encontrado');
    }

    const visitorHash = this.fingerprints.buildVisitorHash(context);
    if (!visitorHash) {
      throw new BadRequestException('No se pudo identificar la visita para registrar la reaccion');
    }

    await this.reactionRepository.upsert(article.id, visitorHash, reactionType);
    return this.reactionRepository.getSummary(article.id, visitorHash);
  }
}

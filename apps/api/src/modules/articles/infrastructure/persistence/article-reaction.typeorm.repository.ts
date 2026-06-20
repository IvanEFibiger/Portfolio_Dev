import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArticleReactionType } from '../../domain/entities/article-reaction.entity';
import {
  ArticleReactionRepositoryPort,
  ArticleReactionSummary,
} from '../../domain/ports/article-reaction.repository.port';
import { ArticleReactionOrmEntity } from './article-reaction.orm-entity';

@Injectable()
export class ArticleReactionTypeOrmRepository implements ArticleReactionRepositoryPort {
  constructor(
    @InjectRepository(ArticleReactionOrmEntity)
    private readonly repo: Repository<ArticleReactionOrmEntity>,
  ) {}

  async getSummary(
    articleId: string,
    visitorHash?: string | null,
  ): Promise<ArticleReactionSummary> {
    const rows = await this.repo
      .createQueryBuilder('reaction')
      .select('reaction.reactionType', 'reactionType')
      .addSelect('COUNT(*)', 'count')
      .where('reaction.articleId = :articleId', { articleId })
      .groupBy('reaction.reactionType')
      .getRawMany<{ reactionType: ArticleReactionType; count: string }>();

    const counts = { like: 0, fire: 0 };
    for (const row of rows) {
      if (row.reactionType === 'like' || row.reactionType === 'fire') {
        counts[row.reactionType] = Number(row.count);
      }
    }

    const viewerReaction = visitorHash
      ? await this.repo.findOne({ where: { articleId, visitorHash } })
      : null;

    return {
      counts,
      total: counts.like + counts.fire,
      viewerReaction:
        viewerReaction?.reactionType === 'like' || viewerReaction?.reactionType === 'fire'
          ? viewerReaction.reactionType
          : null,
    };
  }

  async upsert(
    articleId: string,
    visitorHash: string,
    reactionType: ArticleReactionType,
  ): Promise<void> {
    await this.repo.upsert(
      {
        articleId,
        visitorHash,
        reactionType,
      },
      ['articleId', 'visitorHash'],
    );
  }
}

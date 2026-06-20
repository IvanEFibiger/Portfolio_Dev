import { ArticleReactionType } from '../entities/article-reaction.entity';

export interface ArticleReactionCounts {
  like: number;
  fire: number;
}

export interface ArticleReactionSummary {
  counts: ArticleReactionCounts;
  total: number;
  viewerReaction: ArticleReactionType | null;
}

export interface ArticleReactionRepositoryPort {
  getSummary(articleId: string, visitorHash?: string | null): Promise<ArticleReactionSummary>;
  upsert(articleId: string, visitorHash: string, reactionType: ArticleReactionType): Promise<void>;
}

export const ARTICLE_REACTION_REPOSITORY = Symbol('ARTICLE_REACTION_REPOSITORY');

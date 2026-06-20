export type ArticleReactionType = 'like' | 'fire';

export interface ArticleReactionCounts {
  like: number;
  fire: number;
}

export interface ArticleReactions {
  counts: ArticleReactionCounts;
  total: number;
  viewerReaction: ArticleReactionType | null;
}

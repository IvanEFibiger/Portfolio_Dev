export type ArticleReactionType = 'like' | 'fire';

export class ArticleReaction {
  constructor(
    public readonly id: string,
    public readonly articleId: string,
    public visitorHash: string,
    public reactionType: ArticleReactionType,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}
}

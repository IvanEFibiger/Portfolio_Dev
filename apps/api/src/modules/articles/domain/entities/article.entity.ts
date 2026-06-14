export type ArticleStatus = 'draft' | 'published' | 'archived';
export type ArticleVisibility = 'public' | 'private';

export class Article {
  constructor(
    public readonly id: string,
    public title: string,
    public slug: string,
    public excerpt: string,
    public content: Record<string, unknown>,
    public status: ArticleStatus,
    public visibility: ArticleVisibility,
    public coverImageUrl: string | null,
    public readingTimeMinutes: number | null,
    public publishedAt: Date | null,
    public seoTitle: string | null,
    public seoDescription: string | null,
    public category: string | null,
    public tags: string[],
    public createdAt: Date,
    public updatedAt: Date,
  ) {}

  publish(): void {
    if (this.status === 'published') return;
    this.status = 'published';
    this.publishedAt = new Date();
  }

  unpublish(): void {
    this.status = 'draft';
  }

  archive(): void {
    this.status = 'archived';
  }

  isPubliclyVisible(): boolean {
    return this.status === 'published' && this.visibility === 'public';
  }
}

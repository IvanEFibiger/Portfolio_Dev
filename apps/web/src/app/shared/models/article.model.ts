import { ArticleContentBlock } from './content-block.model';

export type ArticleStatus = 'draft' | 'published' | 'archived';

export interface ArticleSummary {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  status: ArticleStatus;
  coverImageUrl?: string | null;
  publishedAt: string | null;
  readingTimeMinutes: number;
}

export interface ArticleContent {
  blocks: ArticleContentBlock[];
}

export interface ArticleDetail extends ArticleSummary {
  content: ArticleContent;
  seoTitle?: string;
  seoDescription?: string;
}

export interface ArticleFormValue {
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  tags: string;
  seoTitle: string;
  seoDescription: string;
  status: ArticleStatus;
  blocks: ArticleContentBlock[];
}

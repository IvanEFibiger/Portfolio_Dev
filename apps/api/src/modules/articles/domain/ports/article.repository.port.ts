import { Article, ArticleStatus, ArticleVisibility } from '../entities/article.entity';

export interface CreateArticleData {
  title: string;
  slug: string;
  excerpt: string;
  content: Record<string, unknown>;
  status: ArticleStatus;
  visibility: ArticleVisibility;
  coverImageUrl: string | null;
  readingTimeMinutes: number | null;
  publishedAt: Date | null;
  seoTitle: string | null;
  seoDescription: string | null;
  category: string | null;
  tags: string[];
}

export interface ArticleRepositoryPort {
  findById(id: string): Promise<Article | null>;
  findBySlug(slug: string): Promise<Article | null>;
  findAllPublished(): Promise<Article[]>;
  findAll(): Promise<Article[]>;
  save(article: Article): Promise<Article>;
  create(data: CreateArticleData): Promise<Article>;
  delete(id: string): Promise<void>;
}

export const ARTICLE_REPOSITORY = Symbol('ARTICLE_REPOSITORY');

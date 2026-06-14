import { GetArticleBySlugUseCase, GetPublicArticlesUseCase } from './get-articles.use-case';
import { Article } from '../../domain/entities/article.entity';
import { ArticleRepositoryPort } from '../../domain/ports/article.repository.port';

type ArticleOverrides = Partial<
  Omit<Article, 'publish' | 'unpublish' | 'archive' | 'isPubliclyVisible'>
>;

function createArticle(overrides: ArticleOverrides = {}): Article {
  const now = new Date();
  return new Article(
    overrides.id ?? 'article-1',
    overrides.title ?? 'Título del artículo',
    overrides.slug ?? 'titulo-del-articulo',
    overrides.excerpt ?? 'Resumen del artículo',
    overrides.content ?? {},
    overrides.status ?? 'published',
    overrides.visibility ?? 'public',
    overrides.coverImageUrl ?? null,
    overrides.readingTimeMinutes ?? 5,
    overrides.publishedAt ?? now,
    overrides.seoTitle ?? null,
    overrides.seoDescription ?? null,
    overrides.category ?? 'backend',
    overrides.tags ?? ['nestjs'],
    overrides.createdAt ?? now,
    overrides.updatedAt ?? now,
  );
}

describe('GetArticleBySlugUseCase', () => {
  it('devuelve el artículo cuando está publicado y es público', async () => {
    const article = createArticle({ status: 'published', visibility: 'public' });
    const repo = {
      findBySlug: jest.fn().mockResolvedValue(article),
    } as unknown as ArticleRepositoryPort;

    const useCase = new GetArticleBySlugUseCase(repo);
    const result = await useCase.execute('titulo-del-articulo');

    expect(repo.findBySlug).toHaveBeenCalledWith('titulo-del-articulo');
    expect(result).toBe(article);
  });

  it('devuelve null cuando el artículo no es públicamente visible', async () => {
    const article = createArticle({ status: 'draft', visibility: 'public' });
    const repo = {
      findBySlug: jest.fn().mockResolvedValue(article),
    } as unknown as ArticleRepositoryPort;

    const useCase = new GetArticleBySlugUseCase(repo);
    const result = await useCase.execute('titulo-del-articulo');

    expect(result).toBeNull();
  });

  it('devuelve null cuando no existe el artículo', async () => {
    const repo = {
      findBySlug: jest.fn().mockResolvedValue(null),
    } as unknown as ArticleRepositoryPort;

    const useCase = new GetArticleBySlugUseCase(repo);
    const result = await useCase.execute('no-existe');

    expect(result).toBeNull();
  });
});

describe('GetPublicArticlesUseCase', () => {
  it('devuelve todos los artículos publicados si no hay término de búsqueda', async () => {
    const articles = [
      createArticle({ id: 'a1', slug: 'articulo-uno' }),
      createArticle({ id: 'a2', slug: 'articulo-dos' }),
    ];
    const repo = {
      findAllPublished: jest.fn().mockResolvedValue(articles),
    } as unknown as ArticleRepositoryPort;

    const useCase = new GetPublicArticlesUseCase(repo);
    const result = await useCase.execute();

    expect(repo.findAllPublished).toHaveBeenCalled();
    expect(result).toHaveLength(2);
  });

  it('filtra por texto en título, excerpt, categoría o tags', async () => {
    const articles = [
      createArticle({
        id: 'a1',
        title: 'Introducción a NestJS',
        excerpt: 'Guía básica',
        category: 'node',
        tags: ['node'],
      }),
      createArticle({
        id: 'a2',
        title: 'React avanzado',
        excerpt: 'Hooks y context',
        category: 'frontend',
        tags: ['frontend'],
      }),
      createArticle({
        id: 'a3',
        title: 'Seguridad',
        excerpt: 'JWT en NestJS',
        category: 'backend',
        tags: ['security'],
      }),
    ];
    const repo = {
      findAllPublished: jest.fn().mockResolvedValue(articles),
    } as unknown as ArticleRepositoryPort;

    const useCase = new GetPublicArticlesUseCase(repo);

    const byTitle = await useCase.execute('NestJS');
    expect(byTitle).toHaveLength(2);
    expect(byTitle.map((a) => a.id)).toContain('a1');
    expect(byTitle.map((a) => a.id)).toContain('a3');

    const byTag = await useCase.execute('frontend');
    expect(byTag).toHaveLength(1);
    expect(byTag[0].id).toBe('a2');

    const byCategory = await useCase.execute('backend');
    expect(byCategory).toHaveLength(1);
    expect(byCategory[0].id).toBe('a3');
  });

  it('devuelve lista vacía si ningún artículo coincide', async () => {
    const articles = [createArticle({ title: 'NestJS básico' })];
    const repo = {
      findAllPublished: jest.fn().mockResolvedValue(articles),
    } as unknown as ArticleRepositoryPort;

    const useCase = new GetPublicArticlesUseCase(repo);
    const result = await useCase.execute('angular');

    expect(result).toEqual([]);
  });
});

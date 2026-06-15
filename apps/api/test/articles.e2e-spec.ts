import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as request from 'supertest';
import { ArticlesModule } from '../src/modules/articles/articles.module';
import { ArticleOrmEntity } from '../src/modules/articles/infrastructure/persistence/article.orm-entity';
import { AdminUserOrmEntity } from '../src/modules/auth/admin-user.orm-entity';

function createArticleOrm(overrides: Partial<ArticleOrmEntity> = {}): ArticleOrmEntity {
  const now = new Date();
  return {
    id: 'article-1',
    title: 'Introducción a NestJS',
    slug: 'introduccion-a-nestjs',
    excerpt: 'Guía básica',
    content: {},
    coverImageUrl: undefined,
    status: 'published',
    visibility: 'public',
    readingTimeMinutes: 5,
    publishedAt: now,
    seoTitle: undefined,
    seoDescription: undefined,
    category: 'backend',
    tags: ['nestjs'],
    createdAt: now,
    updatedAt: now,
    ...overrides,
  } as ArticleOrmEntity;
}

describe('Public Articles (e2e)', () => {
  let app: INestApplication;
  const articleRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
  };
  const adminUserRepository = {
    findOne: jest.fn(),
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ConfigModule.forRoot({ isGlobal: true }), ArticlesModule],
    })
      .overrideProvider(ConfigService)
      .useValue({
        get: (key: string) => {
          if (key === 'jwt.secret') return 'test-secret-with-at-least-32-characters-long';
          if (key === 'jwt.expiration') return '1h';
          return undefined;
        },
      })
      .overrideProvider(getRepositoryToken(ArticleOrmEntity))
      .useValue(articleRepository)
      .overrideProvider(getRepositoryToken(AdminUserOrmEntity))
      .useValue(adminUserRepository)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(() => {
    articleRepository.find.mockReset();
    articleRepository.findOne.mockReset();
  });

  it('GET /public/articles responde 200 con la lista publicada', () => {
    const articles = [
      createArticleOrm({ id: 'article-1' }),
      createArticleOrm({ id: 'article-2', slug: 'otro-articulo' }),
    ];
    articleRepository.find.mockResolvedValue(articles);

    return request(app.getHttpServer())
      .get('/public/articles')
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveLength(2);
        expect(res.body[0].slug).toBe('introduccion-a-nestjs');
        expect(res.body[1].slug).toBe('otro-articulo');
      });
  });

  it('GET /public/articles responde 200 filtrada por query', () => {
    const articles = [createArticleOrm({ id: 'article-1', title: 'NestJS avanzado' })];
    articleRepository.find.mockResolvedValue(articles);

    return request(app.getHttpServer())
      .get('/public/articles?q=nestjs')
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveLength(1);
        expect(res.body[0].title).toBe('NestJS avanzado');
      });
  });

  it('GET /public/articles/:slug responde 200 para un artículo publicado', () => {
    const article = createArticleOrm({ status: 'published', visibility: 'public' });
    articleRepository.findOne.mockResolvedValue(article);

    return request(app.getHttpServer())
      .get('/public/articles/introduccion-a-nestjs')
      .expect(200)
      .expect((res) => {
        expect(res.body.slug).toBe('introduccion-a-nestjs');
        expect(res.body.status).toBe('published');
      });
  });

  it('GET /public/articles/:slug responde 404 si no existe', () => {
    articleRepository.findOne.mockResolvedValue(null);

    return request(app.getHttpServer()).get('/public/articles/no-existe').expect(404);
  });

  it('GET /public/articles/:slug responde 404 para un artículo no público', () => {
    const article = createArticleOrm({ status: 'draft', visibility: 'public' });
    articleRepository.findOne.mockResolvedValue(article);

    return request(app.getHttpServer()).get('/public/articles/introduccion-a-nestjs').expect(404);
  });
});

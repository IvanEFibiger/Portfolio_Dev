import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SkipThrottle } from '@nestjs/throttler';
import {
  GetPublicArticlesUseCase,
  GetArticleBySlugUseCase,
} from '../../application/use-cases/get-articles.use-case';

@ApiTags('Public Articles')
@Controller('public/articles')
@SkipThrottle()
export class PublicArticlesController {
  constructor(
    private readonly getPublicArticles: GetPublicArticlesUseCase,
    private readonly getArticleBySlug: GetArticleBySlugUseCase,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Listar artículos publicados' })
  async findAll() {
    const articles = await this.getPublicArticles.execute();
    return articles.map((a) => ({
      id: a.id,
      title: a.title,
      slug: a.slug,
      excerpt: a.excerpt,
      coverImageUrl: a.coverImageUrl,
      readingTimeMinutes: a.readingTimeMinutes,
      publishedAt: a.publishedAt,
      category: a.category,
      tags: a.tags,
    }));
  }

  @Get(':slug')
  @ApiOperation({ summary: 'Obtener artículo publicado por slug' })
  async findBySlug(@Param('slug') slug: string) {
    const article = await this.getArticleBySlug.execute(slug);
    if (!article) throw new NotFoundException('Artículo no encontrado');
    return article;
  }
}

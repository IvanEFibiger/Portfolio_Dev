import {
  Body,
  Controller,
  Get,
  Headers,
  HttpCode,
  HttpStatus,
  Ip,
  NotFoundException,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SkipThrottle, Throttle } from '@nestjs/throttler';
import { ReactToArticleDto } from '../../application/dto/react-to-article.dto';
import {
  GetPublicArticlesUseCase,
  GetArticleBySlugUseCase,
} from '../../application/use-cases/get-articles.use-case';
import { GetArticleReactionsUseCase } from '../../application/use-cases/get-article-reactions.use-case';
import { ReactToArticleUseCase } from '../../application/use-cases/react-to-article.use-case';

@ApiTags('Public Articles')
@Controller('public/articles')
@SkipThrottle()
export class PublicArticlesController {
  constructor(
    private readonly getPublicArticles: GetPublicArticlesUseCase,
    private readonly getArticleBySlug: GetArticleBySlugUseCase,
    private readonly getArticleReactions: GetArticleReactionsUseCase,
    private readonly reactToArticle: ReactToArticleUseCase,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Listar articulos publicados' })
  async findAll(@Query('q') q?: string) {
    const articles = await this.getPublicArticles.execute(q);
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

  @Get(':slug/reactions')
  @ApiOperation({ summary: 'Obtener reacciones de un articulo' })
  async reactions(
    @Param('slug') slug: string,
    @Headers('user-agent') userAgent?: string,
    @Headers('x-forwarded-for') forwardedFor?: string,
    @Ip() reqIp?: string,
  ) {
    return this.getArticleReactions.execute(slug, {
      userAgent,
      ip: this.resolveClientIp(forwardedFor, reqIp),
    });
  }

  @Post(':slug/reactions')
  @HttpCode(HttpStatus.OK)
  @Throttle({ default: { limit: 10, ttl: 60000 } })
  @ApiOperation({ summary: 'Registrar reaccion en un articulo' })
  async react(
    @Param('slug') slug: string,
    @Body() dto: ReactToArticleDto,
    @Headers('user-agent') userAgent?: string,
    @Headers('x-forwarded-for') forwardedFor?: string,
    @Ip() reqIp?: string,
  ) {
    return this.reactToArticle.execute(slug, dto.reactionType, {
      userAgent,
      ip: this.resolveClientIp(forwardedFor, reqIp),
    });
  }

  @Get(':slug')
  @ApiOperation({ summary: 'Obtener articulo publicado por slug' })
  async findBySlug(@Param('slug') slug: string) {
    const article = await this.getArticleBySlug.execute(slug);
    if (!article) throw new NotFoundException('Articulo no encontrado');
    return article;
  }

  private resolveClientIp(forwardedFor?: string, reqIp?: string): string | undefined {
    return forwardedFor?.split(',')[0]?.trim() || reqIp || undefined;
  }
}

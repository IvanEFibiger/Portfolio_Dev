import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@common/guards/jwt-auth.guard';
import { CreateArticleDto } from '../../application/dto/create-article.dto';
import { UpdateArticleDto } from '../../application/dto/update-article.dto';
import { CreateArticleUseCase } from '../../application/use-cases/create-article.use-case';
import {
  GetAllArticlesUseCase,
  GetArticleByIdUseCase,
} from '../../application/use-cases/get-articles.use-case';
import { UpdateArticleUseCase } from '../../application/use-cases/update-article.use-case';
import {
  PublishArticleUseCase,
  UnpublishArticleUseCase,
} from '../../application/use-cases/publish-article.use-case';
import { ArticleNotFoundError } from '../../domain/errors/article-not-found.error';
import { Inject } from '@nestjs/common';
import {
  ARTICLE_REPOSITORY,
  ArticleRepositoryPort,
} from '../../domain/ports/article.repository.port';

@ApiTags('Admin Articles')
@Controller('admin/articles')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class AdminArticlesController {
  constructor(
    private readonly createArticle: CreateArticleUseCase,
    private readonly getAllArticles: GetAllArticlesUseCase,
    private readonly getArticleById: GetArticleByIdUseCase,
    private readonly updateArticle: UpdateArticleUseCase,
    private readonly publishArticle: PublishArticleUseCase,
    private readonly unpublishArticle: UnpublishArticleUseCase,
    @Inject(ARTICLE_REPOSITORY)
    private readonly articleRepository: ArticleRepositoryPort,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Listar todos los artículos (admin)' })
  async findAll() {
    return this.getAllArticles.execute();
  }

  @Post()
  @ApiOperation({ summary: 'Crear artículo' })
  async create(@Body() dto: CreateArticleDto) {
    return this.createArticle.execute(dto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener artículo por ID (admin)' })
  async findById(@Param('id', ParseUUIDPipe) id: string) {
    const article = await this.getArticleById.execute(id);
    if (!article) throw new NotFoundException('Artículo no encontrado');
    return article;
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar artículo' })
  async update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateArticleDto) {
    try {
      return await this.updateArticle.execute(id, dto);
    } catch (error) {
      if (error instanceof ArticleNotFoundError) throw new NotFoundException(error.message);
      throw error;
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar artículo' })
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.articleRepository.delete(id);
  }

  @Patch(':id/publish')
  @ApiOperation({ summary: 'Publicar artículo' })
  async publish(@Param('id', ParseUUIDPipe) id: string) {
    try {
      return await this.publishArticle.execute(id);
    } catch (error) {
      if (error instanceof ArticleNotFoundError) throw new NotFoundException(error.message);
      throw error;
    }
  }

  @Patch(':id/unpublish')
  @ApiOperation({ summary: 'Despublicar artículo' })
  async unpublish(@Param('id', ParseUUIDPipe) id: string) {
    try {
      return await this.unpublishArticle.execute(id);
    } catch (error) {
      if (error instanceof ArticleNotFoundError) throw new NotFoundException(error.message);
      throw error;
    }
  }
}

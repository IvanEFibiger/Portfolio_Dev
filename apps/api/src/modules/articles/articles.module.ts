import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleOrmEntity } from './infrastructure/persistence/article.orm-entity';
import { ArticleTypeOrmRepository } from './infrastructure/persistence/article.typeorm.repository';
import { ARTICLE_REPOSITORY } from './domain/ports/article.repository.port';
import { CreateArticleUseCase } from './application/use-cases/create-article.use-case';
import {
  GetPublicArticlesUseCase,
  GetAllArticlesUseCase,
  GetArticleByIdUseCase,
  GetArticleBySlugUseCase,
} from './application/use-cases/get-articles.use-case';
import { UpdateArticleUseCase } from './application/use-cases/update-article.use-case';
import {
  PublishArticleUseCase,
  UnpublishArticleUseCase,
} from './application/use-cases/publish-article.use-case';
import { PublicArticlesController } from './interfaces/http/public-articles.controller';
import { AdminArticlesController } from './interfaces/http/admin-articles.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([ArticleOrmEntity]), AuthModule],
  controllers: [PublicArticlesController, AdminArticlesController],
  providers: [
    {
      provide: ARTICLE_REPOSITORY,
      useClass: ArticleTypeOrmRepository,
    },
    CreateArticleUseCase,
    GetPublicArticlesUseCase,
    GetAllArticlesUseCase,
    GetArticleByIdUseCase,
    GetArticleBySlugUseCase,
    UpdateArticleUseCase,
    PublishArticleUseCase,
    UnpublishArticleUseCase,
  ],
})
export class ArticlesModule {}

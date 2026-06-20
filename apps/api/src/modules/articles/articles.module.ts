import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleOrmEntity } from './infrastructure/persistence/article.orm-entity';
import { ArticleReactionOrmEntity } from './infrastructure/persistence/article-reaction.orm-entity';
import { ArticleTypeOrmRepository } from './infrastructure/persistence/article.typeorm.repository';
import { ArticleReactionTypeOrmRepository } from './infrastructure/persistence/article-reaction.typeorm.repository';
import { ARTICLE_REPOSITORY } from './domain/ports/article.repository.port';
import { ARTICLE_REACTION_REPOSITORY } from './domain/ports/article-reaction.repository.port';
import { CreateArticleUseCase } from './application/use-cases/create-article.use-case';
import {
  GetPublicArticlesUseCase,
  GetAllArticlesUseCase,
  GetArticleByIdUseCase,
  GetArticleBySlugUseCase,
} from './application/use-cases/get-articles.use-case';
import { GetArticleReactionsUseCase } from './application/use-cases/get-article-reactions.use-case';
import { ReactToArticleUseCase } from './application/use-cases/react-to-article.use-case';
import { ArticleVisitorFingerprintService } from './application/use-cases/article-visitor-fingerprint.service';
import { UpdateArticleUseCase } from './application/use-cases/update-article.use-case';
import {
  PublishArticleUseCase,
  UnpublishArticleUseCase,
} from './application/use-cases/publish-article.use-case';
import { PublicArticlesController } from './interfaces/http/public-articles.controller';
import { AdminArticlesController } from './interfaces/http/admin-articles.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([ArticleOrmEntity, ArticleReactionOrmEntity]), AuthModule],
  controllers: [PublicArticlesController, AdminArticlesController],
  providers: [
    {
      provide: ARTICLE_REPOSITORY,
      useClass: ArticleTypeOrmRepository,
    },
    {
      provide: ARTICLE_REACTION_REPOSITORY,
      useClass: ArticleReactionTypeOrmRepository,
    },
    CreateArticleUseCase,
    GetPublicArticlesUseCase,
    GetAllArticlesUseCase,
    GetArticleByIdUseCase,
    GetArticleBySlugUseCase,
    GetArticleReactionsUseCase,
    ReactToArticleUseCase,
    ArticleVisitorFingerprintService,
    UpdateArticleUseCase,
    PublishArticleUseCase,
    UnpublishArticleUseCase,
  ],
})
export class ArticlesModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleOrmEntity } from '../articles/infrastructure/persistence/article.orm-entity';
import { ProjectOrmEntity } from '../projects/infrastructure/persistence/project.orm-entity';
import { LabOrmEntity } from '../lab/infrastructure/persistence/lab.orm-entity';
import { SitemapController } from './sitemap.controller';
import { SitemapService } from './sitemap.service';

@Module({
  imports: [TypeOrmModule.forFeature([ArticleOrmEntity, ProjectOrmEntity, LabOrmEntity])],
  controllers: [SitemapController],
  providers: [SitemapService],
})
export class SitemapModule {}

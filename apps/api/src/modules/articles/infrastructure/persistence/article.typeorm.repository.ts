import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from '../../domain/entities/article.entity';
import {
  ArticleRepositoryPort,
  CreateArticleData,
} from '../../domain/ports/article.repository.port';
import { ArticleOrmEntity } from './article.orm-entity';
import { ArticleMapper } from './article.mapper';

@Injectable()
export class ArticleTypeOrmRepository implements ArticleRepositoryPort {
  constructor(
    @InjectRepository(ArticleOrmEntity)
    private readonly repo: Repository<ArticleOrmEntity>,
  ) {}

  async findById(id: string): Promise<Article | null> {
    const entity = await this.repo.findOne({ where: { id } });
    return entity ? ArticleMapper.toDomain(entity) : null;
  }

  async findBySlug(slug: string): Promise<Article | null> {
    const entity = await this.repo.findOne({ where: { slug } });
    return entity ? ArticleMapper.toDomain(entity) : null;
  }

  async findAllPublished(): Promise<Article[]> {
    const entities = await this.repo.find({
      where: { status: 'published', visibility: 'public' },
      order: { publishedAt: 'DESC' },
    });
    return entities.map(ArticleMapper.toDomain);
  }

  async findAll(): Promise<Article[]> {
    const entities = await this.repo.find({ order: { createdAt: 'DESC' } });
    return entities.map(ArticleMapper.toDomain);
  }

  async save(article: Article): Promise<Article> {
    const ormData = ArticleMapper.toOrm(article);
    const saved = await this.repo.save(ormData);
    const full = await this.repo.findOneOrFail({ where: { id: saved.id } });
    return ArticleMapper.toDomain(full);
  }

  async create(data: CreateArticleData): Promise<Article> {
    const entity = this.repo.create({
      title: data.title,
      slug: data.slug,
      excerpt: data.excerpt,
      content: data.content,
      status: data.status,
      visibility: data.visibility,
      coverImageUrl: data.coverImageUrl ?? undefined,
      readingTimeMinutes: data.readingTimeMinutes ?? undefined,
      publishedAt: data.publishedAt ?? undefined,
      seoTitle: data.seoTitle ?? undefined,
      seoDescription: data.seoDescription ?? undefined,
      category: data.category ?? undefined,
      tags: data.tags ?? undefined,
    });
    const saved = await this.repo.save(entity);
    return ArticleMapper.toDomain(saved);
  }

  async delete(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}

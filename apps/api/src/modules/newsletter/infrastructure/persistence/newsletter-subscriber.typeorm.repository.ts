import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NewsletterSubscriber } from '../../domain/entities/newsletter-subscriber.entity';
import {
  CreateNewsletterSubscriberData,
  NewsletterSubscriberRepositoryPort,
} from '../../domain/ports/newsletter-subscriber.repository.port';
import { NewsletterSubscriberOrmEntity } from './newsletter-subscriber.orm-entity';
import { NewsletterSubscriberMapper } from './newsletter-subscriber.mapper';

@Injectable()
export class NewsletterSubscriberTypeOrmRepository implements NewsletterSubscriberRepositoryPort {
  constructor(
    @InjectRepository(NewsletterSubscriberOrmEntity)
    private readonly repo: Repository<NewsletterSubscriberOrmEntity>,
  ) {}

  async findByEmail(email: string): Promise<NewsletterSubscriber | null> {
    const entity = await this.repo.findOne({ where: { email } });
    return entity ? NewsletterSubscriberMapper.toDomain(entity) : null;
  }

  async findAll(): Promise<NewsletterSubscriber[]> {
    const entities = await this.repo.find({ order: { createdAt: 'DESC' } });
    return entities.map(NewsletterSubscriberMapper.toDomain);
  }

  async create(data: CreateNewsletterSubscriberData): Promise<NewsletterSubscriber> {
    const entity = this.repo.create({
      email: data.email,
      status: data.status,
      confirmationToken: data.confirmationToken ?? undefined,
      subscribedAt: data.subscribedAt ?? undefined,
      unsubscribedAt: data.unsubscribedAt ?? undefined,
    });
    const saved = await this.repo.save(entity);
    return NewsletterSubscriberMapper.toDomain(saved);
  }

  async save(subscriber: NewsletterSubscriber): Promise<NewsletterSubscriber> {
    const ormData = NewsletterSubscriberMapper.toOrm(subscriber);
    const saved = await this.repo.save(ormData);
    const full = await this.repo.findOneOrFail({ where: { id: saved.id } });
    return NewsletterSubscriberMapper.toDomain(full);
  }
}

import {
  NewsletterSubscriber,
  SubscriberStatus,
} from '../../domain/entities/newsletter-subscriber.entity';
import { NewsletterSubscriberOrmEntity } from './newsletter-subscriber.orm-entity';

export class NewsletterSubscriberMapper {
  static toDomain(orm: NewsletterSubscriberOrmEntity): NewsletterSubscriber {
    return new NewsletterSubscriber(
      orm.id,
      orm.email,
      orm.status as SubscriberStatus,
      orm.confirmationToken ?? null,
      orm.subscribedAt ?? null,
      orm.unsubscribedAt ?? null,
      orm.createdAt,
      orm.updatedAt,
    );
  }

  static toOrm(domain: NewsletterSubscriber): Partial<NewsletterSubscriberOrmEntity> {
    return {
      id: domain.id,
      email: domain.email,
      status: domain.status,
      confirmationToken: domain.confirmationToken ?? undefined,
      subscribedAt: domain.subscribedAt ?? undefined,
      unsubscribedAt: domain.unsubscribedAt ?? undefined,
    };
  }
}

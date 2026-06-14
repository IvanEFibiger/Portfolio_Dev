import { NewsletterSubscriber, SubscriberStatus } from '../entities/newsletter-subscriber.entity';

export interface CreateNewsletterSubscriberData {
  email: string;
  status: SubscriberStatus;
  confirmationToken: string | null;
  subscribedAt: Date | null;
  unsubscribedAt: Date | null;
}

export interface NewsletterSubscriberRepositoryPort {
  findByEmail(email: string): Promise<NewsletterSubscriber | null>;
  findAll(): Promise<NewsletterSubscriber[]>;
  create(data: CreateNewsletterSubscriberData): Promise<NewsletterSubscriber>;
  save(subscriber: NewsletterSubscriber): Promise<NewsletterSubscriber>;
}

export const NEWSLETTER_SUBSCRIBER_REPOSITORY = Symbol('NEWSLETTER_SUBSCRIBER_REPOSITORY');

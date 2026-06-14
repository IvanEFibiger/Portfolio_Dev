import { Inject, Injectable } from '@nestjs/common';
import {
  NEWSLETTER_SUBSCRIBER_REPOSITORY,
  NewsletterSubscriberRepositoryPort,
} from '../../domain/ports/newsletter-subscriber.repository.port';
import { NewsletterSubscriber } from '../../domain/entities/newsletter-subscriber.entity';

@Injectable()
export class GetSubscribersUseCase {
  constructor(
    @Inject(NEWSLETTER_SUBSCRIBER_REPOSITORY)
    private readonly subscriberRepository: NewsletterSubscriberRepositoryPort,
  ) {}

  async execute(): Promise<NewsletterSubscriber[]> {
    return this.subscriberRepository.findAll();
  }
}

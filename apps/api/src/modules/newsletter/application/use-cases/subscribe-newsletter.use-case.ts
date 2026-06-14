import { ConflictException, Inject, Injectable } from '@nestjs/common';
import {
  NEWSLETTER_SUBSCRIBER_REPOSITORY,
  NewsletterSubscriberRepositoryPort,
} from '../../domain/ports/newsletter-subscriber.repository.port';
import { SubscribeNewsletterDto } from '../dto/subscribe-newsletter.dto';
import { NewsletterSubscriber } from '../../domain/entities/newsletter-subscriber.entity';
import { randomUUID } from 'crypto';

@Injectable()
export class SubscribeNewsletterUseCase {
  constructor(
    @Inject(NEWSLETTER_SUBSCRIBER_REPOSITORY)
    private readonly subscriberRepository: NewsletterSubscriberRepositoryPort,
  ) {}

  async execute(dto: SubscribeNewsletterDto): Promise<NewsletterSubscriber> {
    const existing = await this.subscriberRepository.findByEmail(dto.email);

    if (existing) {
      if (existing.status === 'unsubscribed') {
        existing.status = 'pending';
        existing.confirmationToken = randomUUID();
        existing.subscribedAt = new Date();
        existing.unsubscribedAt = null;
        return this.subscriberRepository.save(existing);
      }

      throw new ConflictException('Este correo electrónico ya está suscrito al newsletter');
    }

    return this.subscriberRepository.create({
      email: dto.email,
      status: 'pending',
      confirmationToken: randomUUID(),
      subscribedAt: new Date(),
      unsubscribedAt: null,
    });
  }
}

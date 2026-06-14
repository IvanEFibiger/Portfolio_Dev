import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewsletterSubscriberOrmEntity } from './infrastructure/persistence/newsletter-subscriber.orm-entity';
import { NewsletterSubscriberTypeOrmRepository } from './infrastructure/persistence/newsletter-subscriber.typeorm.repository';
import { NEWSLETTER_SUBSCRIBER_REPOSITORY } from './domain/ports/newsletter-subscriber.repository.port';
import { SubscribeNewsletterUseCase } from './application/use-cases/subscribe-newsletter.use-case';
import { GetSubscribersUseCase } from './application/use-cases/get-subscribers.use-case';
import { PublicNewsletterController } from './interfaces/http/public-newsletter.controller';
import { AdminNewsletterController } from './interfaces/http/admin-newsletter.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([NewsletterSubscriberOrmEntity]), AuthModule],
  controllers: [PublicNewsletterController, AdminNewsletterController],
  providers: [
    {
      provide: NEWSLETTER_SUBSCRIBER_REPOSITORY,
      useClass: NewsletterSubscriberTypeOrmRepository,
    },
    SubscribeNewsletterUseCase,
    GetSubscribersUseCase,
  ],
})
export class NewsletterModule {}

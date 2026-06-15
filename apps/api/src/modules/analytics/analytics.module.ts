import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { ANALYTICS_EVENT_REPOSITORY } from './domain/ports/analytics-event.repository.port';
import { AnalyticsEventOrmEntity } from './infrastructure/persistence/analytics-event.orm-entity';
import { AnalyticsEventTypeOrmRepository } from './infrastructure/persistence/analytics-event.typeorm.repository';
import { RecordPageViewUseCase } from './application/use-cases/record-page-view.use-case';
import { GetAnalyticsSummaryUseCase } from './application/use-cases/get-analytics-summary.use-case';
import { PurgeOldAnalyticsUseCase } from './application/use-cases/purge-old-analytics.use-case';
import { PublicAnalyticsController } from './interfaces/http/public-analytics.controller';
import { AdminAnalyticsController } from './interfaces/http/admin-analytics.controller';
import { PurgeOldAnalyticsCron } from './interfaces/scheduling/purge-old-analytics.cron';

@Module({
  imports: [TypeOrmModule.forFeature([AnalyticsEventOrmEntity]), AuthModule],
  controllers: [PublicAnalyticsController, AdminAnalyticsController],
  providers: [
    {
      provide: ANALYTICS_EVENT_REPOSITORY,
      useClass: AnalyticsEventTypeOrmRepository,
    },
    RecordPageViewUseCase,
    GetAnalyticsSummaryUseCase,
    PurgeOldAnalyticsUseCase,
    PurgeOldAnalyticsCron,
  ],
})
export class AnalyticsModule {}

import { Inject, Injectable } from '@nestjs/common';
import {
  ANALYTICS_EVENT_REPOSITORY,
  AnalyticsEventRepositoryPort,
} from '../../domain/ports/analytics-event.repository.port';

@Injectable()
export class PurgeOldAnalyticsUseCase {
  constructor(
    @Inject(ANALYTICS_EVENT_REPOSITORY)
    private readonly analyticsRepository: AnalyticsEventRepositoryPort,
  ) {}

  async execute(retentionDays: number, now = new Date()): Promise<number> {
    const cutoff = new Date(now.getTime() - retentionDays * 24 * 60 * 60 * 1000);
    return this.analyticsRepository.deleteOlderThan(cutoff);
  }
}

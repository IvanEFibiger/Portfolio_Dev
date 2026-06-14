import { Inject, Injectable } from '@nestjs/common';
import {
  ANALYTICS_EVENT_REPOSITORY,
  AnalyticsEventRepositoryPort,
  AnalyticsSummary,
} from '../../domain/ports/analytics-event.repository.port';
import { AnalyticsSummaryQueryDto } from '../dto/analytics-summary-query.dto';

@Injectable()
export class GetAnalyticsSummaryUseCase {
  constructor(
    @Inject(ANALYTICS_EVENT_REPOSITORY)
    private readonly analyticsRepository: AnalyticsEventRepositoryPort,
  ) {}

  async execute(query: AnalyticsSummaryQueryDto): Promise<AnalyticsSummary> {
    return this.analyticsRepository.getSummary({
      from: query.from ? new Date(query.from) : undefined,
      to: query.to ? new Date(query.to) : undefined,
    });
  }
}

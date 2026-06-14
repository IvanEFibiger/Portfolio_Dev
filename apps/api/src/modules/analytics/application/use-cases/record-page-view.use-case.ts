import { createHash } from 'crypto';
import { Inject, Injectable, Logger } from '@nestjs/common';
import {
  ANALYTICS_EVENT_REPOSITORY,
  AnalyticsEventRepositoryPort,
} from '../../domain/ports/analytics-event.repository.port';
import { CreatePageViewDto } from '../dto/create-page-view.dto';

@Injectable()
export class RecordPageViewUseCase {
  private readonly logger = new Logger(RecordPageViewUseCase.name);

  constructor(
    @Inject(ANALYTICS_EVENT_REPOSITORY)
    private readonly analyticsRepository: AnalyticsEventRepositoryPort,
  ) {}

  async execute(dto: CreatePageViewDto, userAgent?: string): Promise<void> {
    try {
      await this.analyticsRepository.create({
        path: dto.path,
        eventType: 'page_view',
        referrer: dto.referrer ?? null,
        userAgentHash: userAgent ? this.hashUserAgent(userAgent) : null,
      });
    } catch (error) {
      this.logger.warn(`No se pudo registrar page view: ${(error as Error).message}`);
    }
  }

  private hashUserAgent(userAgent: string): string {
    return createHash('sha256').update(userAgent).digest('hex');
  }
}

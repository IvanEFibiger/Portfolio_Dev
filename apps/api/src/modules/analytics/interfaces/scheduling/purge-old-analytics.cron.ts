import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PurgeOldAnalyticsUseCase } from '../../application/use-cases/purge-old-analytics.use-case';

@Injectable()
export class PurgeOldAnalyticsCron {
  private readonly logger = new Logger(PurgeOldAnalyticsCron.name);

  constructor(
    private readonly purgeOldAnalytics: PurgeOldAnalyticsUseCase,
    private readonly config: ConfigService,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_3AM)
  async handleCron(): Promise<void> {
    const retentionDays = this.config.get<number>('analytics.retentionDays') ?? 365;
    const deletedRows = await this.purgeOldAnalytics.execute(retentionDays);

    this.logger.log(
      `Purgados ${deletedRows} eventos de analytics con mas de ${retentionDays} dias`,
    );
  }
}

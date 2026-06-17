import { createHash } from 'crypto';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ANALYTICS_EVENT_REPOSITORY,
  AnalyticsEventRepositoryPort,
} from '../../domain/ports/analytics-event.repository.port';
import { CreatePageViewDto } from '../dto/create-page-view.dto';

export interface PageViewContext {
  userAgent?: string;
  ip?: string;
}

@Injectable()
export class RecordPageViewUseCase {
  private readonly logger = new Logger(RecordPageViewUseCase.name);

  constructor(
    @Inject(ANALYTICS_EVENT_REPOSITORY)
    private readonly analyticsRepository: AnalyticsEventRepositoryPort,
    private readonly config: ConfigService,
  ) {}

  async execute(dto: CreatePageViewDto, context: PageViewContext = {}): Promise<void> {
    try {
      await this.analyticsRepository.create({
        path: dto.path,
        eventType: 'page_view',
        referrer: dto.referrer ?? null,
        userAgentHash: context.userAgent ? this.hashUserAgent(context.userAgent) : null,
        visitorHash: this.buildVisitorHash(context.ip, context.userAgent),
        isOwner: dto.isOwner === true,
      });
    } catch (error) {
      this.logger.warn(`No se pudo registrar page view: ${(error as Error).message}`);
    }
  }

  private hashUserAgent(userAgent: string): string {
    return createHash('sha256').update(userAgent).digest('hex');
  }

  /**
   * Identificador de visitante NO reversible y NO persistente. Se hashea
   * IP + user-agent junto a una sal que rota cada día (fecha UTC + JWT_SECRET).
   * Como la sal cambia a diario, el mismo visitante no es vinculable entre días
   * y nunca se almacena la IP en claro: solo sirve para contar únicos del día.
   */
  private buildVisitorHash(ip?: string, userAgent?: string): string | null {
    if (!ip) return null;
    const dailySalt = new Date().toISOString().slice(0, 10);
    const secret = this.config.get<string>('jwt.secret') ?? '';
    return createHash('sha256')
      .update(`${ip}|${userAgent ?? ''}|${dailySalt}|${secret}`)
      .digest('hex');
  }
}

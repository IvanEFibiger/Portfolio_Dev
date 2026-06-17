import { AnalyticsEvent, AnalyticsEventType } from '../../domain/entities/analytics-event.entity';
import { AnalyticsEventOrmEntity } from './analytics-event.orm-entity';

export class AnalyticsEventMapper {
  static toDomain(orm: AnalyticsEventOrmEntity): AnalyticsEvent {
    return new AnalyticsEvent(
      orm.id,
      orm.path,
      orm.eventType as AnalyticsEventType,
      orm.referrer ?? null,
      orm.userAgentHash ?? null,
      orm.visitorHash ?? null,
      orm.isOwner ?? false,
      orm.createdAt,
    );
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { AnalyticsEvent } from '../../domain/entities/analytics-event.entity';
import {
  AnalyticsEventRepositoryPort,
  AnalyticsSummary,
  AnalyticsSummaryFilters,
  CreateAnalyticsEventData,
} from '../../domain/ports/analytics-event.repository.port';
import { AnalyticsEventOrmEntity } from './analytics-event.orm-entity';
import { AnalyticsEventMapper } from './analytics-event.mapper';

@Injectable()
export class AnalyticsEventTypeOrmRepository implements AnalyticsEventRepositoryPort {
  constructor(
    @InjectRepository(AnalyticsEventOrmEntity)
    private readonly repo: Repository<AnalyticsEventOrmEntity>,
  ) {}

  async create(data: CreateAnalyticsEventData): Promise<AnalyticsEvent> {
    const entity = this.repo.create({
      path: data.path,
      eventType: data.eventType,
      referrer: data.referrer ?? undefined,
      userAgentHash: data.userAgentHash ?? undefined,
      visitorHash: data.visitorHash ?? undefined,
      isOwner: data.isOwner,
    });
    const saved = await this.repo.save(entity);
    return AnalyticsEventMapper.toDomain(saved);
  }

  async getSummary(filters: AnalyticsSummaryFilters): Promise<AnalyticsSummary> {
    const createdAt = this.buildCreatedAtFilter(filters);
    const where = { eventType: 'page_view', ...(createdAt ? { createdAt } : {}) };

    const [totalPageViews, uniqueVisitors, ownerPageViews, topPages, viewsByDate] =
      await Promise.all([
        this.repo.count({ where }),
        this.repo
          .createQueryBuilder('event')
          .select('COUNT(DISTINCT event.visitor_hash)', 'count')
          .where('event.event_type = :eventType', { eventType: 'page_view' })
          .andWhere('event.is_owner = false')
          .andWhere('event.visitor_hash IS NOT NULL')
          .andWhere(this.dateCondition(filters), this.dateParameters(filters))
          .getRawOne<{ count: string }>(),
        this.repo.count({ where: { ...where, isOwner: true } }),
        this.repo
          .createQueryBuilder('event')
          .select('event.path', 'path')
          .addSelect('COUNT(*)', 'views')
          .where('event.event_type = :eventType', { eventType: 'page_view' })
          .andWhere(this.dateCondition(filters), this.dateParameters(filters))
          .groupBy('event.path')
          .orderBy('views', 'DESC')
          .limit(10)
          .getRawMany<{ path: string; views: string }>(),
        this.repo
          .createQueryBuilder('event')
          .select("TO_CHAR(DATE_TRUNC('day', event.created_at), 'YYYY-MM-DD')", 'date')
          .addSelect('COUNT(*)', 'views')
          .where('event.event_type = :eventType', { eventType: 'page_view' })
          .andWhere(this.dateCondition(filters), this.dateParameters(filters))
          .groupBy("DATE_TRUNC('day', event.created_at)")
          .orderBy("DATE_TRUNC('day', event.created_at)", 'ASC')
          .getRawMany<{ date: string; views: string }>(),
      ]);

    return {
      totalPageViews,
      uniqueVisitors: Number(uniqueVisitors?.count ?? 0),
      ownerPageViews,
      topPages: topPages.map((row) => ({ path: row.path, views: Number(row.views) })),
      viewsByDate: viewsByDate.map((row) => ({ date: row.date, views: Number(row.views) })),
    };
  }

  async deleteOlderThan(date: Date): Promise<number> {
    const result = await this.repo
      .createQueryBuilder()
      .delete()
      .where('created_at < :date', { date })
      .execute();

    return result.affected ?? 0;
  }

  private buildCreatedAtFilter(filters: AnalyticsSummaryFilters) {
    if (filters.from && filters.to) return Between(filters.from, filters.to);
    if (filters.from) return MoreThanOrEqual(filters.from);
    if (filters.to) return LessThanOrEqual(filters.to);
    return undefined;
  }

  private dateCondition(filters: AnalyticsSummaryFilters): string {
    if (filters.from && filters.to) return 'event.created_at BETWEEN :from AND :to';
    if (filters.from) return 'event.created_at >= :from';
    if (filters.to) return 'event.created_at <= :to';
    return '1=1';
  }

  private dateParameters(filters: AnalyticsSummaryFilters): Record<string, Date> {
    return {
      ...(filters.from ? { from: filters.from } : {}),
      ...(filters.to ? { to: filters.to } : {}),
    };
  }
}

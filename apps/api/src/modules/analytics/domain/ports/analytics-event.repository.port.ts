import { AnalyticsEvent, AnalyticsEventType } from '../entities/analytics-event.entity';

export interface CreateAnalyticsEventData {
  path: string;
  eventType: AnalyticsEventType;
  referrer: string | null;
  userAgentHash: string | null;
  visitorHash: string | null;
  isOwner: boolean;
}

export interface AnalyticsTopPage {
  path: string;
  views: number;
}

export interface AnalyticsViewsByDate {
  date: string;
  views: number;
}

export interface AnalyticsSummary {
  totalPageViews: number;
  // Visitantes únicos que NO sos vos (distinct visitor_hash con is_owner = false).
  uniqueVisitors: number;
  // Page views marcados como propios del dueño del sitio.
  ownerPageViews: number;
  topPages: AnalyticsTopPage[];
  viewsByDate: AnalyticsViewsByDate[];
}

export interface AnalyticsSummaryFilters {
  from?: Date;
  to?: Date;
}

export interface AnalyticsEventRepositoryPort {
  create(data: CreateAnalyticsEventData): Promise<AnalyticsEvent>;
  getSummary(filters: AnalyticsSummaryFilters): Promise<AnalyticsSummary>;
  deleteOlderThan(date: Date): Promise<number>;
}

export const ANALYTICS_EVENT_REPOSITORY = Symbol('ANALYTICS_EVENT_REPOSITORY');

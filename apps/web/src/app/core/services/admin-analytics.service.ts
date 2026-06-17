import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { MOCK_ADMIN_METRICS, MOCK_ANALYTICS } from '../../shared/mocks/admin.mock';
import { AdminMetric, AnalyticsSummary } from '../../shared/models/analytics.model';

@Injectable({ providedIn: 'root' })
export class AdminAnalyticsService {
  private readonly http = inject(HttpClient);

  getMetrics(): Observable<AdminMetric[]> {
    if (environment.useMocks) {
      return of(MOCK_ADMIN_METRICS);
    }

    return this.getSummary().pipe(map((summary) => this.buildMetrics(summary)));
  }

  getSummary(): Observable<AnalyticsSummary> {
    if (environment.useMocks) {
      return of(MOCK_ANALYTICS);
    }

    return this.http
      .get<AnalyticsSummary>(`${environment.apiBaseUrl}/admin/analytics/summary`)
      .pipe(map((summary) => this.normalizeSummary(summary)));
  }

  private buildMetrics(summary: AnalyticsSummary): AdminMetric[] {
    const topPage = summary.topPages[0];

    return [
      {
        label: 'Visitantes unicos',
        value: summary.uniqueVisitors,
        hint: 'Distintos a vos, deduplicado por dia',
      },
      { label: 'Page views', value: summary.totalPageViews, hint: 'Total registrado' },
      { label: 'Rutas visitadas', value: summary.topPages.length, hint: 'Con trafico registrado' },
      {
        label: 'Dias con actividad',
        value: summary.viewsByDate.length,
        hint: 'Serie historica real',
      },
      {
        label: 'Ruta principal',
        value: topPage?.views ?? 0,
        hint: topPage ? topPage.path : 'Sin visitas todavia',
      },
    ];
  }

  private normalizeSummary(summary: AnalyticsSummary): AnalyticsSummary {
    return {
      totalPageViews: summary.totalPageViews,
      uniqueVisitors: summary.uniqueVisitors ?? 0,
      ownerPageViews: summary.ownerPageViews ?? 0,
      topPages: summary.topPages ?? [],
      viewsByDate: summary.viewsByDate ?? [],
      recentVisits: summary.recentVisits ?? [],
      topArticles: summary.topArticles ?? [],
      topProjects: summary.topProjects ?? [],
    };
  }
}

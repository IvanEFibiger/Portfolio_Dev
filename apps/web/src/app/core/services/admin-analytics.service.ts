import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { MOCK_ADMIN_METRICS, MOCK_ANALYTICS } from '../../shared/mocks/admin.mock';
import { AdminMetric, AnalyticsSummary } from '../../shared/models/analytics.model';

@Injectable({ providedIn: 'root' })
export class AdminAnalyticsService {
  private readonly http = inject(HttpClient);

  getMetrics(): Observable<AdminMetric[]> {
    return of(MOCK_ADMIN_METRICS);
  }

  getSummary(): Observable<AnalyticsSummary> {
    if (environment.useMocks) {
      return of(MOCK_ANALYTICS);
    }

    return this.http.get<AnalyticsSummary>(`${environment.apiBaseUrl}/admin/analytics/summary`);
  }
}

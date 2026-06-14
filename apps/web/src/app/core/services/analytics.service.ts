import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { catchError, Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  private readonly http = inject(HttpClient);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  recordPageView(path: string): Observable<void> {
    // No registrar page views durante SSR: `document` no existe en el servidor
    // y el evento debe contabilizar visitas reales del navegador.
    if (environment.useMocks || !this.isBrowser) {
      return of(void 0);
    }

    return this.http
      .post<void>(`${environment.apiBaseUrl}/analytics/page-view`, {
        path,
        referrer: document.referrer || undefined,
      })
      .pipe(catchError(() => of(void 0)));
  }
}

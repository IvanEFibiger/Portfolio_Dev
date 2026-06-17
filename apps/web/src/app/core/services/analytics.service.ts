import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { catchError, Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';

const OWNER_FLAG_KEY = 'pf_owner';

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
        isOwner: this.isOwner(),
      })
      .pipe(catchError(() => of(void 0)));
  }

  /**
   * Marca/desmarca este navegador como "dueño del sitio" para descontar tus
   * propias visitas. Se activa visitando cualquier URL con `?owner=1` (y se
   * apaga con `?owner=0`); queda persistido en localStorage de este navegador.
   */
  private isOwner(): boolean {
    try {
      const param = new URLSearchParams(window.location.search).get('owner');
      if (param === '1') {
        localStorage.setItem(OWNER_FLAG_KEY, '1');
      } else if (param === '0') {
        localStorage.removeItem(OWNER_FLAG_KEY);
      }
      return localStorage.getItem(OWNER_FLAG_KEY) === '1';
    } catch {
      // localStorage puede no estar disponible (modo privado, etc.).
      return false;
    }
  }
}

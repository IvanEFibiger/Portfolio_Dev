import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface AdminRuntimeConfig {
  production: boolean;
  apiBaseUrl: string;
  siteUrl: string;
  useMocks: boolean;
}

export interface AdminHealthProbe {
  ok: boolean;
  status: string;
  checkedAt: Date;
  details: string;
}

interface HealthResponse {
  status?: string;
  info?: Record<string, unknown>;
  error?: Record<string, unknown>;
  details?: Record<string, unknown>;
}

@Injectable({ providedIn: 'root' })
export class AdminSettingsService {
  private readonly http = inject(HttpClient);

  readonly runtime: AdminRuntimeConfig = {
    production: environment.production,
    apiBaseUrl: environment.apiBaseUrl,
    siteUrl: environment.siteUrl,
    useMocks: environment.useMocks,
  };

  checkHealth(): Observable<AdminHealthProbe> {
    if (environment.useMocks) {
      return of({
        ok: true,
        status: 'mocked',
        checkedAt: new Date(),
        details: 'Modo mocks activo: no se consulta el backend.',
      });
    }

    return this.http.get<HealthResponse>(`${environment.apiBaseUrl}/health`).pipe(
      map((response) => ({
        ok: response.status === 'ok',
        status: response.status ?? 'unknown',
        checkedAt: new Date(),
        details: this.formatDetails(response),
      })),
      catchError((error: unknown) =>
        of({
          ok: false,
          status: 'offline',
          checkedAt: new Date(),
          details: this.formatError(error),
        }),
      ),
    );
  }

  private formatDetails(response: HealthResponse): string {
    const database = response.details?.['database'] ?? response.info?.['database'];
    if (database && typeof database === 'object' && 'status' in database) {
      return `Base de datos: ${String((database as { status?: unknown }).status)}`;
    }

    return 'Backend respondió sin detalles adicionales.';
  }

  private formatError(error: unknown): string {
    if (error && typeof error === 'object' && 'message' in error) {
      return String((error as { message?: unknown }).message);
    }

    return 'No se pudo consultar /health.';
  }
}

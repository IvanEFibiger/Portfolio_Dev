import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AdminAnalyticsService } from '../../../core/services/admin-analytics.service';
import { AdminArticlesService } from '../../../core/services/admin-articles.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [AsyncPipe, RouterLink],
  template: `
    <header class="admin-page-header">
      <div>
        <div class="admin-page-title">Dashboard</div>
        <div class="admin-page-sub">Resumen del sistema</div>
      </div>
      <div class="admin-date mono">{{ today }}</div>
    </header>

    @if (metrics$ | async; as metrics) {
      <section class="dash-metrics">
        @for (metric of metrics; track metric.label) {
          <article class="metric-card">
            <div class="metric-label">{{ metric.label }}</div>
            <div class="metric-value">{{ metric.value }}</div>
            <div class="metric-delta" [class]="metricDeltaClass(metric)">{{ metric.hint }}</div>
          </article>
        }
      </section>
    }

    @if (recentArticles$ | async; as articles) {
      <div class="admin-table-wrap">
        <div class="admin-table-header">
          Artículos recientes
          <a routerLink="/admin/articles">Ver todos →</a>
        </div>
        <table class="admin-table">
          <thead>
            <tr>
              <th>Título</th>
              <th>Categoría</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            @for (article of articles.slice(0, 5); track article.id) {
              <tr>
                <td class="td-title">{{ article.title }}</td>
                <td>
                  <span
                    style="font-family: var(--mono); font-size: 11px; color: var(--text-faint);"
                    >{{ article.category }}</span
                  >
                </td>
                <td>
                  @switch (article.status) {
                    @case ('published') {
                      <span class="badge-pub">Publicado</span>
                    }
                    @case ('draft') {
                      <span class="badge-draft">Borrador</span>
                    }
                    @default {
                      <span class="badge-arch">Archivado</span>
                    }
                  }
                </td>
                <td>
                  <div class="td-actions">
                    <a [routerLink]="['/admin/articles', article.id, 'edit']">editar</a>
                    <a href="javascript:void(0)" class="del" (click)="$event.preventDefault()"
                      >eliminar</a
                    >
                  </div>
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  private readonly analyticsService = inject(AdminAnalyticsService);
  private readonly articlesService = inject(AdminArticlesService);

  readonly metrics$ = this.analyticsService.getMetrics();
  readonly recentArticles$ = this.articlesService.getArticles();
  readonly today = new Date().toLocaleDateString('es-AR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  metricDeltaClass(metric: { label: string; value: number; hint: string }): string {
    const hint = metric.hint.toLowerCase();
    if (hint.includes('publicado') || hint.includes('visible') || hint.includes('confirmado'))
      return 'positive';
    if (hint.includes('pendiente') || hint.includes('borrador') || hint.includes('desarrollo'))
      return 'warning';
    return 'neutral';
  }
}

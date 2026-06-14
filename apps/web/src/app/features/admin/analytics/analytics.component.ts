import { AsyncPipe, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AdminAnalyticsService } from '../../../core/services/admin-analytics.service';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [AsyncPipe, DatePipe],
  template: `
    <header class="admin-page-header row-header">
      <div>
        <div class="admin-page-title">Analytics</div>
        <div class="admin-page-sub">Métricas simples y no invasivas</div>
      </div>
    </header>
    @if (summary$ | async; as summary) {
      <section class="dash-metrics" style="margin-bottom: 22px;">
        <article class="metric-card">
          <div class="metric-label">Page views</div>
          <div class="metric-value">{{ summary.totalPageViews }}</div>
          <div class="metric-delta neutral">Total registrado</div>
        </article>
      </section>
      <section
        style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 14px;"
      >
        <article class="surface-block">
          <h2>Visitas por ruta</h2>
          @for (page of summary.topPages; track page.path) {
            <div
              style="display: flex; justify-content: space-between; align-items: center; padding: 6px 0; border-bottom: 1px solid rgba(99,120,160,0.08);"
            >
              <span style="font-size: 12.5px; color: var(--text-muted);">{{ page.path }}</span>
              <span class="mono" style="font-size: 12px; color: var(--text); font-weight: 600;">{{
                page.views
              }}</span>
            </div>
          }
        </article>
        <article class="surface-block">
          <h2>Últimas visitas</h2>
          @for (visit of summary.recentVisits; track visit.createdAt) {
            <div
              style="display: flex; justify-content: space-between; align-items: center; padding: 6px 0; border-bottom: 1px solid rgba(99,120,160,0.08);"
            >
              <span style="font-size: 12.5px; color: var(--text-muted);">{{ visit.path }}</span>
              <span class="mono" style="font-size: 10.5px; color: var(--text-faint);">{{
                visit.createdAt | date: 'dd/MM HH:mm'
              }}</span>
            </div>
          }
        </article>
        <article class="surface-block">
          <h2>Artículos más vistos</h2>
          @for (article of summary.topArticles; track article.title) {
            <div
              style="display: flex; justify-content: space-between; align-items: center; padding: 6px 0; border-bottom: 1px solid rgba(99,120,160,0.08);"
            >
              <span style="font-size: 12.5px; color: var(--text-muted);">{{ article.title }}</span>
              <span class="mono" style="font-size: 12px; color: var(--text); font-weight: 600;">{{
                article.views
              }}</span>
            </div>
          }
        </article>
        <article class="surface-block">
          <h2>Proyectos más vistos</h2>
          @for (project of summary.topProjects; track project.title) {
            <div
              style="display: flex; justify-content: space-between; align-items: center; padding: 6px 0; border-bottom: 1px solid rgba(99,120,160,0.08);"
            >
              <span style="font-size: 12.5px; color: var(--text-muted);">{{ project.title }}</span>
              <span class="mono" style="font-size: 12px; color: var(--text); font-weight: 600;">{{
                project.views
              }}</span>
            </div>
          }
        </article>
      </section>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnalyticsComponent {
  readonly summary$ = inject(AdminAnalyticsService).getSummary();
}

import { AsyncPipe, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { catchError, of, tap } from 'rxjs';
import { AdminArticlesService } from '../../../core/services/admin-articles.service';
import { ArticleSummary } from '../../../shared/models/article.model';

@Component({
  selector: 'app-admin-articles',
  standalone: true,
  imports: [AsyncPipe, DatePipe, RouterLink],
  template: `
    <header class="admin-page-header row-header">
      <div>
        <div class="admin-page-title">Artículos</div>
        <div class="admin-page-sub">Gestión de contenido técnico</div>
      </div>
      <a class="button button-primary" routerLink="/admin/articles/create">Crear artículo</a>
    </header>
    @if (error()) {
      <p class="form-error">{{ error() }}</p>
    }
    @if (articles$ | async) {
      <div class="admin-table-wrap">
        <div class="admin-table-header">
          <span>Todos los artículos</span>
          <a routerLink="/admin/articles">Ver todos →</a>
        </div>
        <div
          style="display: flex; gap: 12px; padding: 12px 16px; border-bottom: 1px solid var(--border-divider); flex-wrap: wrap;"
        >
          <input
            type="text"
            placeholder="Buscar por título o slug..."
            [value]="searchQuery()"
            (input)="searchQuery.set($any($event.target).value)"
            style="flex: 1 1 220px; min-width: 180px; background: var(--bg); border: 1px solid var(--border2); border-radius: var(--r-md); padding: 8px 12px; font-family: var(--font-sans); font-size: 13px; color: var(--text); outline: none;"
          />
          <select
            [value]="statusFilter()"
            (change)="statusFilter.set($any($event.target).value)"
            style="background: var(--bg); border: 1px solid var(--border2); border-radius: var(--r-md); padding: 8px 12px; font-family: var(--font-sans); font-size: 13px; color: var(--text); outline: none; min-width: 140px;"
          >
            <option value="all">Todos los estados</option>
            <option value="draft">Borrador</option>
            <option value="published">Publicado</option>
            <option value="archived">Archivado</option>
          </select>
        </div>
        <table class="admin-table">
          <thead>
            <tr>
              <th>Título</th>
              <th>Categoría</th>
              <th>Estado</th>
              <th>Fecha</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            @for (article of filteredArticles(); track article.id) {
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
                  @if (article.publishedAt) {
                    <span class="mono" style="font-size: 10.5px; color: var(--text-faint);">{{
                      article.publishedAt | date: 'dd MMM yyyy'
                    }}</span>
                  } @else {
                    <span class="mono" style="font-size: 10.5px; color: var(--text-faint);">—</span>
                  }
                </td>
                <td>
                  <div class="td-actions">
                    <a [routerLink]="['/admin/articles/edit', article.id]">editar</a>
                    @if (article.status === 'draft') {
                      <a
                        href="javascript:void(0)"
                        (click)="publish(article.id); $event.preventDefault()"
                        >publicar</a
                      >
                    } @else if (article.status === 'published') {
                      <a
                        href="javascript:void(0)"
                        (click)="unpublish(article.id); $event.preventDefault()"
                        >despublicar</a
                      >
                    }
                    <a
                      href="javascript:void(0)"
                      class="del"
                      (click)="confirmDelete(article.id); $event.preventDefault()"
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
export class AdminArticlesComponent {
  private readonly service = inject(AdminArticlesService);
  readonly articles = signal<ArticleSummary[]>([]);
  readonly searchQuery = signal('');
  readonly statusFilter = signal('all');
  readonly articles$ = this.service.getArticles().pipe(
    tap((data) => this.articles.set(data)),
    catchError((err) => {
      this.error.set(err.error?.message ?? 'Error al cargar artículos.');
      return of([]);
    }),
  );
  readonly filteredArticles = computed(() => {
    const query = this.searchQuery().trim().toLowerCase();
    const status = this.statusFilter();
    return this.articles().filter((article) => {
      const matchesStatus = status === 'all' || article.status === status;
      const matchesQuery =
        !query ||
        article.title.toLowerCase().includes(query) ||
        article.slug.toLowerCase().includes(query);
      return matchesStatus && matchesQuery;
    });
  });
  readonly error = signal('');

  publish(id: string): void {
    this.service.publish(id).subscribe({
      error: (err) => this.error.set(err.error?.message ?? 'Error al publicar.'),
    });
  }

  unpublish(id: string): void {
    this.service.unpublish(id).subscribe({
      error: (err) => this.error.set(err.error?.message ?? 'Error al despublicar.'),
    });
  }

  confirmDelete(id: string): void {
    if (!confirm('¿Eliminar este artículo? Esta acción no se puede deshacer.')) {
      return;
    }
    this.service.deleteArticle(id).subscribe({
      error: (err) => this.error.set(err.error?.message ?? 'Error al eliminar.'),
    });
  }
}

import { AsyncPipe, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AdminArticlesService } from '../../../core/services/admin-articles.service';

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
    @if (articles$ | async; as articles) {
      <div class="admin-table-wrap">
        <div class="admin-table-header">
          Todos los artículos
          <a routerLink="/admin/articles">Ver todos →</a>
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
            @for (article of articles; track article.id) {
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
  readonly articles$ = this.service.getArticles();
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

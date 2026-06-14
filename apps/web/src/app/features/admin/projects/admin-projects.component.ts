import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { catchError, of, tap } from 'rxjs';
import { AdminProjectsService } from '../../../core/services/admin-projects.service';
import { ProjectSummary } from '../../../shared/models/project.model';

@Component({
  selector: 'app-admin-projects',
  standalone: true,
  imports: [AsyncPipe, RouterLink],
  template: `
    <header class="admin-page-header row-header">
      <div>
        <div class="admin-page-title">Proyectos</div>
        <div class="admin-page-sub">Casos de estudio y portfolio</div>
      </div>
      <a class="button button-primary" routerLink="/admin/projects/create">Crear proyecto</a>
    </header>
    @if (error()) {
      <p class="form-error">{{ error() }}</p>
    }
    @if (projects$ | async) {
      <div class="admin-table-wrap">
        <div class="admin-table-header">
          <span>Todos los proyectos</span>
          <a routerLink="/admin/projects">Ver todos →</a>
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
              <th>Estado</th>
              <th>Tipo</th>
              <th>Orden</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            @for (project of filteredProjects(); track project.id) {
              <tr>
                <td class="td-title">{{ project.title }}</td>
                <td>
                  @switch (project.status) {
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
                  <span
                    style="font-family: var(--mono); font-size: 11px; color: var(--text-faint);"
                    >{{ project.type }}</span
                  >
                </td>
                <td>
                  <span class="mono" style="font-size: 10.5px; color: var(--text-faint);">{{
                    project.sortOrder
                  }}</span>
                </td>
                <td>
                  <div class="td-actions">
                    <a [routerLink]="['/admin/projects/edit', project.id]">editar</a>
                    <a
                      href="javascript:void(0)"
                      class="del"
                      (click)="confirmDelete(project.id); $event.preventDefault()"
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
export class AdminProjectsComponent {
  private readonly service = inject(AdminProjectsService);
  readonly projects = signal<ProjectSummary[]>([]);
  readonly searchQuery = signal('');
  readonly statusFilter = signal('all');
  readonly projects$ = this.service.getProjects().pipe(
    tap((data) => this.projects.set(data)),
    catchError((err) => {
      this.error.set(err.error?.message ?? 'Error al cargar proyectos.');
      return of([]);
    }),
  );
  readonly filteredProjects = computed(() => {
    const query = this.searchQuery().trim().toLowerCase();
    const status = this.statusFilter();
    return this.projects().filter((project) => {
      const matchesStatus = status === 'all' || project.status === status;
      const matchesQuery =
        !query ||
        project.title.toLowerCase().includes(query) ||
        project.slug.toLowerCase().includes(query);
      return matchesStatus && matchesQuery;
    });
  });
  readonly error = signal('');

  confirmDelete(id: string): void {
    if (!confirm('¿Eliminar este proyecto? Esta acción no se puede deshacer.')) {
      return;
    }
    this.service.deleteProject(id).subscribe({
      error: (err) => this.error.set(err.error?.message ?? 'Error al eliminar.'),
    });
  }
}

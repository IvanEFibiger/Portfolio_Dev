import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AdminProjectsService } from '../../../core/services/admin-projects.service';

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
    @if (projects$ | async; as projects) {
      <div class="admin-table-wrap">
        <div class="admin-table-header">
          Todos los proyectos
          <a routerLink="/admin/projects">Ver todos →</a>
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
            @for (project of projects; track project.id) {
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
  readonly projects$ = this.service.getProjects();
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

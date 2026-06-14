import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AdminLabService } from '../../../core/services/admin-lab.service';

@Component({
  selector: 'app-admin-lab',
  standalone: true,
  imports: [AsyncPipe, RouterLink],
  template: `
    <header class="admin-page-header row-header">
      <div>
        <div class="admin-page-title">Laboratorio</div>
        <div class="admin-page-sub">Experimentos, aprendizajes y validaciones tecnicas</div>
      </div>
      <a class="button button-primary" routerLink="/admin/lab/create">Crear lab</a>
    </header>
    @if (error()) {
      <p class="form-error">{{ error() }}</p>
    }
    @if (labs$ | async; as labs) {
      <div class="admin-table-wrap">
        <div class="admin-table-header">Items de laboratorio</div>
        <table class="admin-table">
          <thead>
            <tr>
              <th>Numero</th>
              <th>Titulo</th>
              <th>Estado</th>
              <th>Orden</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            @for (lab of labs; track lab.id) {
              <tr>
                <td>
                  <span class="mono" style="font-size: 10.5px; color: var(--text-faint);">{{
                    lab.labNumber
                  }}</span>
                </td>
                <td class="td-title">{{ lab.title }}</td>
                <td>
                  @switch (lab.status) {
                    @case ('Documentado') {
                      <span class="badge-pub">Documentado</span>
                    }
                    @case ('Archivado') {
                      <span class="badge-arch">Archivado</span>
                    }
                    @default {
                      <span class="badge-draft">{{ lab.status }}</span>
                    }
                  }
                </td>
                <td>
                  <span class="mono" style="font-size: 10.5px; color: var(--text-faint);">{{
                    lab.sortOrder
                  }}</span>
                </td>
                <td>
                  <div class="td-actions">
                    <a [routerLink]="['/admin/lab/edit', lab.id]">editar</a>
                    <a
                      href="javascript:void(0)"
                      class="del"
                      (click)="confirmDelete(lab.id); $event.preventDefault()"
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
export class AdminLabComponent {
  private readonly service = inject(AdminLabService);
  readonly labs$ = this.service.getLabs();
  readonly error = signal('');

  confirmDelete(id: string): void {
    if (!confirm('Eliminar este item de laboratorio? Esta accion no se puede deshacer.')) {
      return;
    }
    this.service.deleteLab(id).subscribe({
      error: (err) => this.error.set(err.error?.message ?? 'Error al eliminar.'),
    });
  }
}

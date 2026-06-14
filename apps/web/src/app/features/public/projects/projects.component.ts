import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { catchError, map, of, startWith } from 'rxjs';
import { ProjectsService } from '../../../core/services/projects.service';
import { PageHeaderComponent } from '../../../shared/components/page-header.component';
import { ProjectCardComponent } from '../../../shared/components/project-card.component';
import {
  EmptyStateComponent,
  ErrorStateComponent,
  LoadingStateComponent,
} from '../../../shared/components/state.components';
import { ProjectSummary } from '../../../shared/models/project.model';

type ProjectsVm =
  | { state: 'loading' }
  | { state: 'error'; message: string }
  | { state: 'ready'; projects: ProjectSummary[] };

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    AsyncPipe,
    PageHeaderComponent,
    ProjectCardComponent,
    EmptyStateComponent,
    ErrorStateComponent,
    LoadingStateComponent,
  ],
  template: `
    <app-page-header
      eyebrow="Proyectos"
      title="Casos de estudio, no capturas sueltas"
      description="Cada proyecto se presenta por problema, restricciones, stack, estado y decisiones técnicas."
    />
    <section class="section">
      <div class="container">
        @if (vm$ | async; as vm) {
          @switch (vm.state) {
            @case ('loading') {
              <app-loading-state message="Cargando casos de estudio..." />
            }
            @case ('error') {
              <app-error-state title="No se pudieron cargar los proyectos" [message]="vm.message" />
            }
            @case ('ready') {
              @if (vm.projects.length) {
                <div class="projects-showcase route-reveal">
                  @for (project of vm.projects; track project.id) {
                    <app-project-card [project]="project" />
                  }
                </div>
              } @else {
                <app-empty-state
                  title="Todavia no hay proyectos publicados"
                  message="Cuando haya casos listos, van a aparecer aca."
                />
              }
            }
          }
        }
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsComponent {
  readonly vm$ = inject(ProjectsService)
    .getProjects()
    .pipe(
      map((projects): ProjectsVm => ({ state: 'ready', projects })),
      startWith({ state: 'loading' } as ProjectsVm),
      catchError(() =>
        of({
          state: 'error',
          message: 'Reintenta en unos minutos o escribime por contacto.',
        } as ProjectsVm),
      ),
    );
}

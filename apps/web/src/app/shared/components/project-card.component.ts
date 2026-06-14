import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProjectSummary } from '../models/project.model';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [RouterLink],
  template: `
    <a
      [routerLink]="['/proyectos', project().slug]"
      class="project-card"
      [class.project-card--featured]="featured()"
    >
      <div class="project-card-header">
        <span class="project-type-badge">{{ project().type }}</span>
        <span
          class="project-status-label mono"
          [class.status-active]="project().operationalStatus === 'active'"
          [class.status-dev]="project().operationalStatus === 'dev'"
          [class.status-wip]="project().operationalStatus === 'wip'"
        >
          @switch (project().operationalStatus) {
            @case ('active') {
              Operativo
            }
            @case ('dev') {
              En desarrollo
            }
            @case ('wip') {
              En progreso
            }
          }
        </span>
      </div>

      <div class="project-name">{{ project().title }}</div>
      <div class="project-summary">{{ project().summary }}</div>

      <div class="project-dimensions">
        <span class="project-dim">
          <svg viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="1.2">
            <rect x="1" y="1" width="8" height="8" rx="1.5" />
          </svg>
          Frontend
        </span>
        <span class="project-dim">
          <svg viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="1.2">
            <circle cx="5" cy="5" r="3.5" />
          </svg>
          Backend
        </span>
        <span class="project-dim">
          <svg viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="1.2">
            <path d="M2 3h6M2 6h6M2 9h6" />
          </svg>
          Datos
        </span>
        <span class="project-dim">
          <svg viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="1.2">
            <path d="M5 1l1 2.5h2.5l-2 1.5.5 2.5L5 6 3 7.5l.5-2.5-2-1.5h2.5z" />
          </svg>
          Seguridad
        </span>
      </div>

      @if (featured()) {
        <div class="project-problem">
          <span class="project-problem-label">Problema</span>
          <span class="project-problem-text">{{ project().problem }}</span>
        </div>
      }

      @if (featured() && project().highlights?.length) {
        <div class="project-highlights">
          @for (highlight of project().highlights; track highlight) {
            <span class="project-highlight">
              <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M2 6l3 3 5-5" />
              </svg>
              {{ highlight }}
            </span>
          }
        </div>
      }

      <div class="project-stack">
        @for (tech of project().stack; track tech) {
          <span class="tech-badge">{{ tech }}</span>
        }
      </div>

      <div class="project-footer">
        <span class="project-complexity">{{ project().complexity }} complejidad</span>
        <span class="project-link">
          Ver caso de estudio
          <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M2 6h8M6 2l4 4-4 4" />
          </svg>
        </span>
      </div>
    </a>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectCardComponent {
  readonly project = input.required<ProjectSummary>();
  readonly featured = input<boolean>(false);
}

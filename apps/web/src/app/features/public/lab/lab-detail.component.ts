import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnDestroy } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map, switchMap, tap } from 'rxjs';
import { LabService } from '../../../core/services/lab.service';
import { SeoService } from '../../../core/services/seo.service';
import { environment } from '../../../../environments/environment';
import { EmptyStateComponent } from '../../../shared/components/state.components';
import { TechBadgeComponent } from '../../../shared/components/tech-badge.component';

@Component({
  selector: 'app-lab-detail',
  standalone: true,
  imports: [AsyncPipe, RouterLink, EmptyStateComponent, TechBadgeComponent],
  template: `
    @if (lab$ | async; as lab) {
      <article class="detail-page">
        <section class="project-hero">
          <a class="back-link" routerLink="/laboratorio">
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
            >
              <path d="M7 3L4 6l3 3" />
            </svg>
            Volver al laboratorio
          </a>
          <div class="project-hero-meta">
            <span class="project-hero-type mono">{{ lab.labNumber }}</span>
            <span
              class="lab-status"
              [class.explorando]="lab.status === 'Explorando'"
              [class.desarrollo]="lab.status === 'En desarrollo'"
              [class.documentado]="lab.status === 'Documentado'"
              [class.archivado]="lab.status === 'Archivado'"
            >
              {{ lab.status }}
            </span>
          </div>
          <h1 class="project-hero-title">{{ lab.title }}</h1>
          <p class="project-hero-summary">{{ lab.description }}</p>
          <div class="project-hero-stack">
            @for (tech of lab.stack; track tech) {
              <app-tech-badge [label]="tech" />
            }
          </div>
        </section>

        <section class="project-section">
          <h3>Aprendizaje</h3>
          <p class="lab-learning">{{ lab.learning }}</p>
        </section>
      </article>
    } @else {
      <app-empty-state
        title="Experimento no encontrado"
        message="El experimento solicitado no existe o no está publicado."
      />
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LabDetailComponent implements OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private readonly lab = inject(LabService);
  private readonly seo = inject(SeoService);

  readonly lab$ = this.route.paramMap.pipe(
    map((params) => params.get('slug') ?? ''),
    switchMap((slug) =>
      this.lab.getLabBySlug(slug).pipe(
        tap((lab) => {
          if (lab) {
            this.seo.updateTags({
              title: `${lab.title} - Laboratorio`,
              description: lab.description,
              url: `${environment.siteUrl}/laboratorio/${lab.slug}`,
              type: 'article',
            });
          }
        }),
      ),
    ),
  );

  ngOnDestroy(): void {
    this.seo.reset();
  }
}

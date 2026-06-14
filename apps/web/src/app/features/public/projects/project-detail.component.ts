import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnDestroy } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map, switchMap, tap } from 'rxjs';
import { ProjectsService } from '../../../core/services/projects.service';
import { SeoService } from '../../../core/services/seo.service';
import { environment } from '../../../../environments/environment';
import { EmptyStateComponent } from '../../../shared/components/state.components';
import { TechBadgeComponent } from '../../../shared/components/tech-badge.component';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [AsyncPipe, RouterLink, EmptyStateComponent, TechBadgeComponent],
  template: `
    @if (project$ | async; as project) {
      <article class="detail-page">
        <section class="project-hero">
          <a class="back-link" routerLink="/proyectos">
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
            Volver a proyectos
          </a>
          <div class="project-hero-meta">
            <span class="project-hero-type">{{ project.type }}</span>
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
            <span
              class="project-hero-ops"
              [class.status-active]="project.operationalStatus === 'active'"
              [class.status-dev]="project.operationalStatus === 'dev'"
              [class.status-wip]="project.operationalStatus === 'wip'"
            >
              @switch (project.operationalStatus) {
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
          <h1 class="project-hero-title">{{ project.title }}</h1>
          <p class="project-hero-summary">{{ project.summary }}</p>
          <div class="project-hero-stack">
            @for (tech of project.stack; track tech) {
              <app-tech-badge [label]="tech" />
            }
          </div>
        </section>

        <section class="project-exec">
          <div class="exec-card exec-card--context">
            <div class="exec-card-icon">
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5">
                <circle cx="8" cy="5" r="3" />
                <path d="M3 14c0-3 2-5 5-5s5 2 5 5" />
              </svg>
            </div>
            <h3>Contexto</h3>
            <p>{{ project.context }}</p>
          </div>
          <div class="exec-card exec-card--complexity">
            <div class="exec-card-icon">
              <svg viewBox="0 0 16 16" fill="none" stroke="#f59e0b" stroke-width="1.5">
                <path d="M8 1v14M1 8h14" />
                <circle cx="8" cy="8" r="2" />
              </svg>
            </div>
            <h3>Complejidad</h3>
            <p>{{ project.complexity }}</p>
          </div>
        </section>

        @if (project.role) {
          <section class="project-role">
            <div class="role-card">
              <div class="role-label">
                <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5">
                  <circle cx="7" cy="5" r="3" />
                  <path d="M2 13c0-3 2.5-5 5-5s5 2 5 5" />
                </svg>
                Mi rol en el proyecto
              </div>
              <p>{{ project.role }}</p>
            </div>
          </section>
        }

        <section class="project-split">
          <div class="split-block split-block--problem">
            <div class="split-label">
              <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5">
                <circle cx="6" cy="6" r="4" />
                <path d="M6 3v3l2 1" />
              </svg>
              El problema
            </div>
            <p>{{ project.problem }}</p>
          </div>
          <div class="split-block split-block--solution">
            <div class="split-label">
              <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M6 1l5 5-5 5-5-5z" />
              </svg>
              La solución
            </div>
            <p>{{ project.solution }}</p>
          </div>
        </section>

        @if (project.restrictions.length) {
          <section class="project-section">
            <h3>Restricciones</h3>
            <ul>
              @for (r of project.restrictions; track r) {
                <li>{{ r }}</li>
              }
            </ul>
          </section>
        }

        @if (project.architecture) {
          <section class="project-section">
            <h3>Arquitectura</h3>
            <p>{{ project.architecture }}</p>
          </section>
        }

        @if (project.technicalDecisions.length) {
          <section class="project-section">
            <h3>Decisiones técnicas</h3>
            <ul>
              @for (d of project.technicalDecisions; track d) {
                <li>{{ d }}</li>
              }
            </ul>
          </section>
        }

        @if (project.security.length) {
          <section class="project-section">
            <h3>Seguridad</h3>
            <ul>
              @for (s of project.security; track s) {
                <li>{{ s }}</li>
              }
            </ul>
          </section>
        }

        @if (project.result) {
          <section class="project-section">
            <h3>Resultado</h3>
            <p>{{ project.result }}</p>
          </section>
        }

        @if (project.learnings) {
          <section class="project-section">
            <h3>Aprendizajes</h3>
            <p>{{ project.learnings }}</p>
          </section>
        }

        @if (project.improvements) {
          <section class="project-section">
            <h3>Mejoras futuras</h3>
            <p>{{ project.improvements }}</p>
          </section>
        }

        <div class="project-links">
          @if (project.repositoryUrl) {
            <a class="project-link" [href]="project.repositoryUrl" target="_blank" rel="noopener"
              >Repositorio</a
            >
          }
          @if (project.demoUrl) {
            <a class="project-link" [href]="project.demoUrl" target="_blank" rel="noopener">Demo</a>
          }
        </div>
      </article>
    } @else {
      <app-empty-state
        title="Proyecto no encontrado"
        message="El proyecto solicitado no existe o no está publicado."
      />
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectDetailComponent implements OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private readonly projects = inject(ProjectsService);
  private readonly seo = inject(SeoService);

  readonly project$ = this.route.paramMap.pipe(
    map((params) => params.get('slug') ?? ''),
    switchMap((slug) =>
      this.projects.getProjectBySlug(slug).pipe(
        tap((project) => {
          if (project) {
            const image = project.coverImageUrl
              ? project.coverImageUrl.startsWith('http')
                ? project.coverImageUrl
                : `${environment.siteUrl}${project.coverImageUrl}`
              : undefined;

            this.seo.updateTags({
              title: `${project.title} - Proyecto`,
              description: project.summary,
              image,
              url: `${environment.siteUrl}/proyectos/${project.slug}`,
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

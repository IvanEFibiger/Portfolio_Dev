import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AsyncPipe, DatePipe } from '@angular/common';
import { catchError, map, of } from 'rxjs';
import { ProjectsService } from '../../../core/services/projects.service';
import { ArticlesService } from '../../../core/services/articles.service';
import { LabService } from '../../../core/services/lab.service';
import { SeoService } from '../../../core/services/seo.service';
import { ProjectCardComponent } from '../../../shared/components/project-card.component';
import { LabCardComponent } from '../../../shared/components/lab-card.component';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AsyncPipe, DatePipe, RouterLink, ProjectCardComponent, LabCardComponent],
  template: `
    <!-- ══════════════════════════════════════════ -->
    <!--   HERO                                     -->
    <!-- ══════════════════════════════════════════ -->
    <section id="hero">
      <div class="hero-container">
        <div class="hero-left">
          <div class="hero-greeting">Full Stack · Arquitectura · <em>Seguridad</em></div>
          <h1 class="hero-name">Ivan<br /><span>Fibiger</span></h1>
          <p class="hero-headline">
            Diseño y desarrollo sistemas completos para resolver problemas reales. Trabajo desde el
            análisis del problema hasta el backend, frontend, base de datos, despliegue, seguridad,
            documentación y puesta en marcha.
          </p>
          <p class="hero-headline">
            Me enfoco en sistemas claros, mantenibles y seguros, pensados para funcionar en
            escenarios reales.
          </p>
          <p class="hero-sub">
            Construyo software pensando en el problema, no solo en la pantalla.
          </p>
          <div class="hero-actions">
            <a class="btn btn-primary" routerLink="/proyectos">
              <svg
                width="14"
                height="14"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <rect x="2" y="3" width="12" height="10" rx="1" />
                <path d="M2 6h12" />
              </svg>
              Ver proyectos
            </a>
            <a class="btn btn-ghost" routerLink="/bitacora">
              <svg
                width="14"
                height="14"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path d="M3 4h10M3 8h8M3 12h6" />
              </svg>
              Bitácora técnica
            </a>
            <a class="btn btn-ghost" routerLink="/sobre-mi">Cómo trabajo →</a>
          </div>
          <div class="hero-scroll-hint" aria-hidden="true">
            <span class="scroll-line"></span>
            <span class="mono">scroll</span>
          </div>
        </div>
        <div class="hero-right">
          <aside class="hero-sumario" aria-label="Sumario del sitio">
            <div class="sumario-header">
              <span class="sumario-title">Sumario</span>
              <span class="sumario-issue mono">ed. {{ currentYear }}</span>
            </div>
            <ol class="sumario-list">
              <li>
                <a routerLink="/proyectos">
                  <span class="sumario-label">Proyectos</span>
                  <span class="sumario-dots" aria-hidden="true"></span>
                  <span class="sumario-num">01</span>
                </a>
              </li>
              <li>
                <a routerLink="/bitacora">
                  <span class="sumario-label">Bitácora técnica</span>
                  <span class="sumario-dots" aria-hidden="true"></span>
                  <span class="sumario-num">02</span>
                </a>
              </li>
              <li>
                <a routerLink="/laboratorio">
                  <span class="sumario-label">Laboratorio</span>
                  <span class="sumario-dots" aria-hidden="true"></span>
                  <span class="sumario-num">03</span>
                </a>
              </li>
              <li>
                <a routerLink="/sobre-mi">
                  <span class="sumario-label">Sobre mí</span>
                  <span class="sumario-dots" aria-hidden="true"></span>
                  <span class="sumario-num">04</span>
                </a>
              </li>
              <li>
                <a routerLink="/como-esta-construido">
                  <span class="sumario-label">Cómo está construido</span>
                  <span class="sumario-dots" aria-hidden="true"></span>
                  <span class="sumario-num">05</span>
                </a>
              </li>
            </ol>
            <p class="sumario-note">
              Sistemas en producción, decisiones documentadas y experimentos con sus fracasos
              incluidos. Sin métricas infladas.
            </p>
          </aside>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════════ -->
    <!--   QUÉ CONSTRUYO                            -->
    <!-- ══════════════════════════════════════════ -->
    <section class="section">
      <div class="container">
        <div class="section-heading">
          <div class="eyebrow">Ámbito técnico</div>
          <h2 class="section-title">Qué construyo</h2>
          <p class="section-desc">
            El código importa, pero también importan los datos, los permisos, los logs, la seguridad
            y lo que pasa cuando algo falla.
          </p>
        </div>
        <div class="capabilities-grid">
          <div class="capability-card">
            <div class="capability-icon">
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5">
                <rect x="1" y="3" width="14" height="10" rx="1" />
                <path d="M1 7h14M5 3v10" />
              </svg>
            </div>
            <div class="capability-name">Sistemas municipales</div>
            <div class="capability-desc">
              Plataformas para gestión, identidad ciudadana e integración de sistemas legacy.
            </div>
          </div>
          <div class="capability-card">
            <div class="capability-icon">
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M8 1v14M1 8h14M3.5 3.5l9 9M12.5 3.5l-9 9" />
              </svg>
            </div>
            <div class="capability-name">APIs backend</div>
            <div class="capability-desc">
              APIs REST con NestJS, autenticación, autorización granular y auditoría.
            </div>
          </div>
          <div class="capability-card">
            <div class="capability-icon">
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5">
                <rect x="2" y="2" width="12" height="12" rx="2" />
                <path d="M6 6l4 4M10 6l-4 4" />
              </svg>
            </div>
            <div class="capability-name">Aplicaciones web</div>
            <div class="capability-desc">
              Frontend Angular moderno: componentes standalone, signals, lazy loading.
            </div>
          </div>
          <div class="capability-card">
            <div class="capability-icon">
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5">
                <rect x="1" y="4" width="14" height="9" rx="1" />
                <path d="M4 4V3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v1" />
                <path d="M1 9h14" />
              </svg>
            </div>
            <div class="capability-name">Paneles admin</div>
            <div class="capability-desc">
              Dashboards de gestión con CRUDs, roles, permisos y flujos de trabajo.
            </div>
          </div>
          <div class="capability-card">
            <div class="capability-icon">
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5">
                <circle cx="8" cy="8" r="6" />
                <path d="M8 4v4l3 2" />
              </svg>
            </div>
            <div class="capability-name">Integraciones</div>
            <div class="capability-desc">
              Gateways entre sistemas: pagos, QR, recaudación, webhooks e idempotencia.
            </div>
          </div>
          <div class="capability-card">
            <div class="capability-icon">
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M4 12L2 8l2-4M12 4l2 4-2 4M9 3l-2 10" />
              </svg>
            </div>
            <div class="capability-name">Automatización con IA</div>
            <div class="capability-desc">
              RAG con modelos locales (Ollama + pgvector) para contextos controlados.
            </div>
          </div>
          <div class="capability-card">
            <div class="capability-icon">
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M8 1l1.5 3 3.5.5-2.5 2.5.5 3.5L8 9l-3 1.5.5-3.5L3 4.5 6.5 4z" />
              </svg>
            </div>
            <div class="capability-name">Seguridad aplicada</div>
            <div class="capability-desc">
              JWT, scopes, hardening de APIs, validaciones y seguridad desde el diseño.
            </div>
          </div>
          <div class="capability-card">
            <div class="capability-icon">
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M2 4h12M2 8h8M2 12h10" />
                <circle cx="14" cy="12" r="2" />
              </svg>
            </div>
            <div class="capability-name">Documentación técnica</div>
            <div class="capability-desc">
              Arquitectura, decisiones, ADRs, contratos de API y guías de despliegue.
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════════ -->
    <!--   METODOLOGÍA                              -->
    <!-- ══════════════════════════════════════════ -->
    <section class="section section--alt">
      <div class="container">
        <div class="section-heading">
          <div class="eyebrow">Metodología</div>
          <h2 class="section-title">Cómo pienso los sistemas</h2>
          <p class="section-desc">Un sistema no termina cuando compila.</p>
        </div>
        <div class="process-flow">
          <div class="process-step">
            <div class="process-node active">Problema</div>
            <div class="process-arrow">→</div>
          </div>
          <div class="process-step">
            <div class="process-node">Requerimientos</div>
            <div class="process-arrow">→</div>
          </div>
          <div class="process-step">
            <div class="process-node">Arquitectura</div>
            <div class="process-arrow">→</div>
          </div>
          <div class="process-step">
            <div class="process-node">Desarrollo</div>
            <div class="process-arrow">→</div>
          </div>
          <div class="process-step">
            <div class="process-node">Seguridad</div>
            <div class="process-arrow">→</div>
          </div>
          <div class="process-step">
            <div class="process-node">Testing</div>
            <div class="process-arrow">→</div>
          </div>
          <div class="process-step">
            <div class="process-node">Deploy</div>
            <div class="process-arrow">→</div>
          </div>
          <div class="process-step">
            <div class="process-node">Documentación</div>
            <div class="process-arrow">→</div>
          </div>
          <div class="process-step">
            <div class="process-node">Mantenimiento</div>
          </div>
        </div>
        <div class="process-quote">
          No me interesa solo que funcione en local.<br />
          Me interesa que se pueda mantener, auditar, desplegar y mejorar.
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════════ -->
    <!--   PROYECTOS DESTACADOS                     -->
    <!-- ══════════════════════════════════════════ -->
    <section class="section">
      <div class="container">
        <div class="section-heading">
          <div class="eyebrow">Casos de estudio</div>
          <h2 class="section-title">Proyectos destacados</h2>
          <p class="section-desc">
            Sistemas construidos para resolver problemas reales en contextos operativos reales.
          </p>
        </div>
        @if (featuredProjects$ | async; as projects) {
          <div class="projects-showcase">
            @for (project of projects; track project.id) {
              <app-project-card [project]="project" [featured]="true" />
            }
          </div>
        }
        <div style="text-align: center; margin-top: 32px;">
          <a class="btn btn-ghost" routerLink="/proyectos">Ver todos los proyectos →</a>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════════ -->
    <!--   BITÁCORA                                   -->
    <!-- ══════════════════════════════════════════ -->
    <section class="section section--alt">
      <div class="container">
        <div class="section-heading">
          <div class="eyebrow">Escritura técnica</div>
          <h2 class="section-title">Bitácora técnica</h2>
          <p class="section-desc">
            Análisis, decisiones y notas de sistemas reales. No tutoriales genéricos.
          </p>
        </div>
        @if (latestArticles$ | async; as articles) {
          <div class="articles-list">
            @for (article of articles; track article.id) {
              <a [routerLink]="['/bitacora', article.slug]" class="article-row">
                <div class="article-meta">
                  <span class="article-cat">{{ article.category }}</span>
                  @if (article.publishedAt) {
                    <span class="article-date mono">{{
                      article.publishedAt | date: 'MMM yyyy'
                    }}</span>
                  }
                  @if (article.readingTimeMinutes) {
                    <span class="article-read mono">{{ article.readingTimeMinutes }} min</span>
                  }
                </div>
                <div class="article-body">
                  <div class="article-title">{{ article.title }}</div>
                  <div class="article-excerpt">{{ article.excerpt }}</div>
                  @if (article.tags.length) {
                    <div class="article-tags">
                      @for (tag of article.tags; track tag) {
                        <span class="article-tag">{{ tag }}</span>
                      }
                    </div>
                  }
                </div>
                <div class="article-arrow">›</div>
              </a>
            }
          </div>
        }
        <div style="text-align: center; margin-top: 32px;">
          <a class="btn btn-ghost" routerLink="/bitacora">Ver toda la bitácora →</a>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════════ -->
    <!--   LABORATORIO                                -->
    <!-- ══════════════════════════════════════════ -->
    <section class="section">
      <div class="container">
        <div class="section-heading">
          <div class="eyebrow">Investigación</div>
          <h2 class="section-title">Laboratorio</h2>
          <p class="section-desc">
            Zona de exploración técnica. Experimentos documentados, investigaciones activas y notas
            de aprendizaje.
          </p>
        </div>
        @if (labs$ | async; as labs) {
          <div class="lab-grid">
            @for (lab of labs; track lab.id) {
              <app-lab-card [lab]="lab" />
            }
          </div>
        }
      </div>
    </section>

    <!-- ══════════════════════════════════════════ -->
    <!--   CTA FINAL                                  -->
    <!-- ══════════════════════════════════════════ -->
    <section class="cta-section">
      <div class="container" style="text-align: center;">
        <div class="eyebrow" style="justify-content: center;">Contacto</div>
        <h2 class="cta-title">Si necesitás construir un sistema serio, podemos hablar.</h2>
        <p class="cta-desc">
          Integrar procesos, bajar una idea a una solución técnica concreta, o simplemente analizar
          un problema juntos.
        </p>
        <a class="btn btn-primary" routerLink="/contacto">
          <svg
            width="14"
            height="14"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
          >
            <rect x="1" y="3" width="14" height="10" rx="1.5" />
            <path d="M1 5l7 5 7-5" />
          </svg>
          Contactar
        </a>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  readonly projects = inject(ProjectsService);
  readonly articles = inject(ArticlesService);
  readonly seo = inject(SeoService);
  readonly featuredProjects$ = this.projects.getFeaturedProjects(3).pipe(catchError(() => of([])));
  readonly latestArticles$ = this.articles.getLatestArticles(3).pipe(catchError(() => of([])));
  readonly lab = inject(LabService);
  readonly labs$ = this.lab.getLabs().pipe(
    map((labs) => labs.slice(0, 3)),
    catchError(() => of([])),
  );
  readonly currentYear = new Date().getFullYear();

  ngOnInit(): void {
    this.seo.updateTags({
      title: 'Ivan Fibiger - Systems & Software',
      description:
        'Portfolio tecnico de Ivan Fibiger: sistemas reales, arquitectura, seguridad aplicada, full stack y bitacora tecnica.',
    });

    this.seo.setJsonLd({
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Ivan Fibiger',
      url: environment.siteUrl,
      jobTitle: 'Full Stack Developer & System Architect',
      sameAs: ['https://github.com/ivanfibiger', 'https://www.linkedin.com/in/ivan-fibiger/'],
    });
  }
}

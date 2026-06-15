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
          <div class="hero-greeting">Desarrollo Full Stack · Arquitectura · <em>Seguridad</em></div>
          <h1 class="hero-name">Ivan <span>Fibiger</span></h1>
          <p class="hero-headline">
            Construyo sistemas completos, desde el análisis del problema hasta la puesta en marcha.
          </p>
          <p class="hero-headline">
            Trabajo con backend, frontend, bases de datos, despliegue, documentación y seguridad,
            buscando soluciones claras, mantenibles y preparadas para uso real.
          </p>
          <p class="hero-sub">
            Mi enfoque no está solo en construir pantallas, sino en entender el problema, diseñar una
            buena solución y llevarla a producción.
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
              Sistemas en producción, decisiones técnicas explicadas y experimentos documentados
              con lo que funcionó, lo que falló y lo que aprendí.
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
            Construyo sistemas completos donde no alcanza con que la pantalla funcione. También
            importan los datos, los permisos, la trazabilidad, la seguridad, la integración con otros
            sistemas y el comportamiento ante errores.
          </p>
          <p class="section-desc">
            Trabajo principalmente sobre aplicaciones web, APIs backend, paneles de administración e
            integraciones entre sistemas. Me interesa que cada proyecto tenga una base técnica clara:
            arquitectura entendible, reglas de negocio bien modeladas, validaciones, auditoría,
            documentación y despliegue reproducible.
          </p>
        </div>
        <div class="section-heading">
          <h2 class="section-title">Áreas de trabajo</h2>
        </div>
        <div class="capabilities-grid">
          <div class="capability-card">
            <div class="capability-icon">
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5">
                <rect x="1" y="3" width="14" height="10" rx="1" />
                <path d="M1 7h14M5 3v10" />
              </svg>
            </div>
            <div class="capability-name">Sistemas de gestión</div>
            <div class="capability-desc">
              Plataformas para organizar procesos internos, usuarios, roles, permisos, formularios,
              expedientes, turnos y flujos administrativos.
            </div>
          </div>
          <div class="capability-card">
            <div class="capability-icon">
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M8 1v14M1 8h14M3.5 3.5l9 9M12.5 3.5l-9 9" />
              </svg>
            </div>
            <div class="capability-name">Backend y APIs</div>
            <div class="capability-desc">
              Servicios backend para exponer datos, aplicar reglas de negocio, gestionar
              autenticación, controlar permisos, validar información y registrar operaciones
              importantes.
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
              Interfaces para operación diaria: paneles, formularios, dashboards, búsquedas, filtros,
              estados y flujos de trabajo.
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
              Conexión entre sistemas, servicios externos, procesos automáticos, intercambio de datos
              y adaptación de información proveniente de plataformas existentes.
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
              Diseño de permisos, control de acceso, validación de entradas, trazabilidad, manejo
              seguro de errores y reducción de superficie de ataque.
            </div>
          </div>
          <div class="capability-card">
            <div class="capability-icon">
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M4 12L2 8l2-4M12 4l2 4-2 4M9 3l-2 10" />
              </svg>
            </div>
            <div class="capability-name">Automatización e IA</div>
            <div class="capability-desc">
              Experimentos controlados para automatizar procesos, asistir tareas técnicas, consultar
              documentación y trabajar con información en contextos acotados.
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
              Arquitectura, decisiones técnicas, contratos de API, guías de despliegue, bitácoras de
              implementación y documentación de mantenimiento.
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
        </div>
        <div class="method-intro">
          <p>
            Un sistema no termina cuando compila. Lo importante aparece después:
            cuando cambia una integración, cuando hay que auditar qué se tocó,
            cuando algo falla o cuando lo mantiene alguien que no lo escribió.
          </p>
          <p>
            No diseño para la demostración. Diseño para producción: para que el
            sistema se pueda mantener, desplegar, auditar y mejorar sin depender
            de que yo esté al lado.
          </p>
        </div>
        <ol class="method-principles">
          <li class="principle">
            <h3 class="principle-title">Diseño asumiendo que algo va a fallar</h3>
            <p class="principle-body">
              Lo externo cambia, se cae o responde distinto a lo esperado. Por
              eso prefiero estados explícitos, errores manejados con claridad y
              procesos que puedan retomarse sin romper datos.
            </p>
          </li>
          <li class="principle">
            <h3 class="principle-title">Prefiero lo explícito antes que lo ingenioso</h3>
            <p class="principle-body">
              El código ingenioso suele depender demasiado de quien lo escribió.
              Prefiero soluciones claras, trazables y fáciles de revisar.
            </p>
          </li>
          <li class="principle">
            <h3 class="principle-title">Documento lo que el código no puede contar solo</h3>
            <p class="principle-body">
              El código muestra qué hace. La documentación explica por qué se
              decidió así, qué alternativas se descartaron y qué hay que tener en
              cuenta para mantenerlo.
            </p>
          </li>
          <li class="principle">
            <h3 class="principle-title">Pruebo donde duele</h3>
            <p class="principle-body">
              No me interesa inflar cobertura por cumplir. Prefiero asegurar las
              reglas críticas, los permisos, los casos borde y los flujos donde
              un error cuesta caro.
            </p>
          </li>
          <li class="principle">
            <h3 class="principle-title">Pienso en quien mantiene</h3>
            <p class="principle-body">
              Logs útiles, trazabilidad, errores entendibles, configuración clara
              y despliegue reproducible. El sistema tiene que poder entenderse sin
              hacer arqueología.
            </p>
          </li>
        </ol>
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
      sameAs: ['https://github.com/IvanEFibiger', 'https://www.linkedin.com/in/ivan-fibiger/'],
    });
  }
}

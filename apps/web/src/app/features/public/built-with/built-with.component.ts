import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PageHeaderComponent } from '../../../shared/components/page-header.component';
import { TechBadgeComponent } from '../../../shared/components/tech-badge.component';

@Component({
  selector: 'app-built-with',
  standalone: true,
  imports: [PageHeaderComponent, TechBadgeComponent],
  template: `
    <app-page-header
      eyebrow="Cómo está construido"
      title="Este portfolio está pensado como una aplicación real"
      description="El objetivo es mostrar cómo organizo un sistema, cómo separo responsabilidades y cómo aplico buenas prácticas desde el inicio."
    />
    <section class="section">
      <div class="container">
        <div class="badge-row" style="margin-bottom: 40px;">
          @for (tech of stack; track tech) {
            <app-tech-badge [label]="tech" />
          }
        </div>
        <div class="built-with-cta">
          <div>
            <span class="mono">stack.real / deployable</span>
            <strong>Monorepo Angular + NestJS con API, admin, migraciones y Docker.</strong>
          </div>
          <a
            class="button button-ghost"
            href="https://github.com/ivanfibiger"
            target="_blank"
            rel="noopener"
          >
            GitHub
          </a>
        </div>
        <div class="info-columns">
          @for (item of architecture; track item.title) {
            <article class="surface-block">
              <h2>{{ item.title }}</h2>
              <p>{{ item.text }}</p>
            </article>
          }
        </div>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BuiltWithComponent {
  readonly stack = [
    'Angular',
    'NestJS',
    'TypeORM',
    'PostgreSQL',
    'Docker Compose',
    'JWT',
    'Arquitectura modular',
    'Hexagonal pragmática',
  ];
  readonly architecture = [
    {
      title: 'Frontend',
      text: 'Angular con componentes standalone, router lazy, signals donde aportan valor, layouts separados y estilos globales sobrios.',
    },
    {
      title: 'Backend',
      text: 'NestJS modular con contratos REST, TypeORM, validaciones, auth JWT y separación pragmática por dominios.',
    },
    {
      title: 'Base de datos',
      text: 'PostgreSQL con migraciones y contenido estructurado en JSON para artículos administrables.',
    },
    {
      title: 'Infraestructura',
      text: 'Docker Compose como base local y estructura preparada para despliegue en VPS con NGINX.',
    },
    {
      title: 'Seguridad',
      text: 'Guards, interceptor JWT, validación de formularios y backend preparado con CORS, Helmet y rate limiting.',
    },
    {
      title: 'Contenido',
      text: 'Proyectos, bitácora técnica y laboratorio salen de servicios preparados para API, con mocks separados hasta integrar backend real.',
    },
    {
      title: 'Roadmap',
      text: 'SSR/prerendering, editor estructurado, búsqueda, SEO dinámico, analytics más completos y hardening progresivo.',
    },
  ];
}

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
            href="https://github.com/IvanEFibiger"
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
    'SSR',
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
      text: 'Angular con componentes standalone, router con lazy loading, signals donde aportan valor y SSR nativo con hidratación. Layouts separados, tema claro/oscuro y estilos globales sobrios.',
    },
    {
      title: 'Backend',
      text: 'NestJS modular con contratos REST, TypeORM, validación con class-validator, auth JWT y separación por dominios (hexagonal pragmática). Casos de uso cubiertos con tests unitarios y e2e.',
    },
    {
      title: 'Base de datos',
      text: 'PostgreSQL con migraciones versionadas (sin synchronize), índices en las columnas de filtro y contenido de artículos en JSON estructurado (jsonb). Retención programada de eventos de analytics.',
    },
    {
      title: 'Infraestructura',
      text: 'La web se sirve con SSR sobre runtime Node; API y PostgreSQL se orquestan con Docker Compose. Despliegue documentado en VPS con NGINX como reverse proxy, SSL y healthchecks.',
    },
    {
      title: 'Seguridad',
      text: 'Rutas protegidas con guards e interceptor JWT con expiración verificada en el front. Backend con CORS, Helmet, rate limiting y CSP por nonce en el render SSR.',
    },
    {
      title: 'Contenido',
      text: 'Proyectos, bitácora y laboratorio se administran desde un panel propio y se sirven desde el backend real, cada uno con su módulo. Los artículos se escriben con un editor por bloques que guarda el contenido como JSON estructurado.',
    },
    {
      title: 'Estado actual',
      text: 'Ya funcionando: SSR con caché de render, editor por bloques, búsqueda y filtros, SEO dinámico con meta tags y sitemap, analytics con retención y hardening de seguridad.',
    },
    {
      title: 'Roadmap',
      text: 'Lo que sigue: más cobertura de tests automatizados, búsqueda full-text en PostgreSQL y métricas de analytics más ricas.',
    },
  ];
}

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PageHeaderComponent } from '../../../shared/components/page-header.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [PageHeaderComponent],
  template: `
    <app-page-header
      eyebrow="Perfil"
      title="Sobre mí"
      description="Desarrollo software completo, desde el análisis del problema hasta el despliegue y la documentación."
    />
    <section class="section">
      <div class="container">
        <div class="about-grid">
          <div>
            <p class="about-intro">
              Soy <strong>Técnico Universitario en Tecnologías de la Programación</strong>. Mi
              trayectoria incluye medios, inspección municipal, comercio y reparación informática
              antes de dedicarme de lleno al desarrollo de software.
            </p>
            <p class="about-intro">
              Esa mezcla me dio algo que considero clave:
              <strong>entiendo tanto el problema técnico como el problema operativo</strong>. No
              desarrollo pensando solo en código; desarrollo pensando en personas, procesos,
              restricciones reales y mantenimiento futuro.
            </p>

            <div class="about-phrase">
              Construyo sistemas reales para problemas reales. Diseño, desarrollo, despliego y
              documento soluciones completas.
            </div>

            <div class="about-work-method">
              <div class="about-work-method-title">Forma de trabajo</div>
              <ul class="about-principles">
                <li>Analizo el problema antes de escribir código</li>
                <li>Diseño la arquitectura pensando en mantenimiento y evolución</li>
                <li>Aplico seguridad desde el diseño, no al final</li>
                <li>Documento decisiones, no solo resultados</li>
                <li>Uso IA como herramienta con criterio, no como oráculo</li>
              </ul>
            </div>
          </div>

          <div class="about-sidebar">
            <div class="about-block">
              <div class="about-block-title">Stack principal</div>
              <div class="stack-tags">
                <span class="stack-tag">Angular</span>
                <span class="stack-tag">NestJS</span>
                <span class="stack-tag">TypeScript</span>
                <span class="stack-tag">PostgreSQL</span>
                <span class="stack-tag">TypeORM</span>
                <span class="stack-tag">Docker</span>
                <span class="stack-tag">JWT</span>
                <span class="stack-tag">Redis</span>
                <span class="stack-tag">C#</span>
                <span class="stack-tag">Flutter</span>
                <span class="stack-tag">pgvector</span>
                <span class="stack-tag">Ollama</span>
              </div>
            </div>

            <div class="about-block">
              <div class="about-block-title">Áreas de interés</div>
              <ul class="area-list">
                <li>Arquitectura backend y modular</li>
                <li>Autenticación y autorización granular</li>
                <li>Seguridad aplicada desde el diseño</li>
                <li>IA local y RAG con datos controlados</li>
                <li>Sistemas municipales y públicos</li>
                <li>DevOps pragmático con Docker</li>
              </ul>
            </div>

            <div class="about-block">
              <div class="about-block-title">Trayectoria</div>
              <div class="about-timeline">
                <div class="about-timeline-item">
                  <span class="about-timeline-year mono">2022→</span>
                  <span class="about-timeline-text"
                    >Desarrollo full stack. Sistemas municipales, APIs, arquitectura.</span
                  >
                </div>
                <div class="about-timeline-item">
                  <span class="about-timeline-year mono">—2022</span>
                  <span class="about-timeline-text"
                    >Reparación informática, inspección municipal, comercio, medios.</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutComponent {}

import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, inject } from '@angular/core';
import { PageHeaderComponent } from '../../../shared/components/page-header.component';
import { SeoService } from '../../../core/services/seo.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [PageHeaderComponent],
  template: `
    <app-page-header eyebrow="Perfil" title="Sobre mí" />
    <section class="section">
      <div class="container">
        <div class="about-grid">
          <div class="about-content">
            <p class="about-intro">
              No llegué al desarrollo en línea recta. Antes de dedicarme al software trabajé muchos
              años de cara a la gente: del lado del que controla un proceso, del que atiende un
              mostrador y del que arregla lo que se rompe.
            </p>
            <p class="about-intro">
              Esa trayectoria es hoy mi forma de trabajar. Cuando desarrollo un sistema, no parto del
              código: parto de haber estado en el lugar de la persona que lo va a usar. Entiendo el
              problema técnico, pero también el operativo —los procesos, las restricciones reales y lo
              que pasa cuando algo falla un martes a la mañana y hay gente esperando.
            </p>

            <div class="about-work-method-title">Cómo construí mi presente</div>
            <p class="about-intro">
              Empecé a trabajar a los 14, en los medios de comunicación de mi familia. Después
              vinieron otros oficios —un corralón, una remisería, una farmacia, un almacén— y casi
              quince años trabajando de cara a la gente antes de dedicarme al software.
            </p>
            <p class="about-intro">
              En 2017 entré al municipio por la puerta administrativa: compras y recaudación primero,
              después inspección de comercio, tránsito y licencias. Ese recorrido me dejó algo que no
              se aprende programando: vi por dentro cómo funciona —y cómo se traba— un proceso público
              real.
            </p>
            <p class="about-intro">
              En paralelo, en 2019 abrí ID Soluciones Informáticas, mi propio espacio de servicios y
              reparación. Y en 2022 empecé la Tecnicatura en Tecnologías de la Programación para
              formalizar lo que venía haciendo por mi cuenta desde chico. Para cuando me recibí, ya no
              quería arreglar máquinas: quería construir los sistemas.
            </p>
            <p class="about-intro">
              Hoy trabajo en la Subsecretaría de Modernización del municipio, desarrollando las
              plataformas que antes inspeccionaba desde el otro lado. Sostengo solo el ciclo de vida
              entero de cada sistema —diseño, desarrollo, seguridad, despliegue y mantenimiento— y la
              mayoría son sistemas públicos en producción: manejan datos sensibles, pagos y procesos de
              los que depende gente todos los días. Ser un equipo de una sola persona me obliga a una
              disciplina particular: no puedo escribir nada que mi propio yo del futuro no pueda
              mantener.
            </p>

            <div class="about-work-method-title">Hacia dónde voy</div>
            <p class="about-intro">
              No me quedé en saber programar. Me formé en seguridad aplicada —tanto defensiva como
              ofensiva— porque construir sistemas públicos sin entender cómo se atacan es construir a
              medias. Y estoy avanzando hacia datos e inteligencia artificial, buscando el cruce entre
              tecnología, datos y desarrollo local: el lugar donde la técnica sirve a un problema
              concreto de la gente.
            </p>

            <div class="about-work-method-title">Qué me diferencia</div>
            <p class="about-intro">
              No soy solo alguien que escribe código. Soy alguien que estuvo del lado de la operación,
              que carga el sistema completo de punta a punta y que sigue profundizando en lugar de
              quedarse quieto. Construyo pensando en quien lo usa hoy y en quien lo mantiene mañana
              —incluso cuando ese alguien soy yo mismo.
            </p>

            <div class="about-work-method-title">Formación</div>
            <p class="about-intro">
              Mi base es la Tecnicatura Universitaria en Tecnologías de la Programación. A partir de
              ahí, el oficio lo mantengo en movimiento por mi cuenta: arquitectura de software,
              seguridad, testing, backend y las herramientas que cada proyecto me va pidiendo. Hoy ese
              camino me lleva hacia la seguridad ofensiva y hacia datos e inteligencia aplicada.
            </p>
            <p class="about-intro">
              No creo en la formación como una lista de títulos, sino como algo que no se detiene. Lo
              que aprendo se nota en lo que construyo.
            </p>
          </div>

          <div class="about-sidebar">
            <div class="about-block">
              <div class="about-block-title">Stack principal</div>
              <div class="stack-tags">
                <span class="stack-tag">TypeScript</span>
                <span class="stack-tag">C#</span>
                <span class="stack-tag">Python</span>
                <span class="stack-tag">Angular</span>
                <span class="stack-tag">Flutter</span>
                <span class="stack-tag">Tailwind CSS</span>
                <span class="stack-tag">NestJS</span>
                <span class="stack-tag">Node.js</span>
                <span class="stack-tag">PostgreSQL</span>
                <span class="stack-tag">Docker</span>
                <span class="stack-tag">Nginx</span>
                <span class="stack-tag">Git</span>
                <span class="stack-tag">GitHub</span>
              </div>
            </div>

            <div class="about-block">
              <div class="about-block-title">Áreas de interés</div>
              <ul class="area-list">
                <li>Arquitectura backend y modular</li>
                <li>Autenticación y autorización granular</li>
                <li>IA local y RAG con datos controlados</li>
                <li>DevOps pragmático</li>
                <li>Observabilidad y trazabilidad</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutComponent implements OnInit, OnDestroy {
  private readonly seo = inject(SeoService);

  ngOnInit(): void {
    this.seo.updateTags({
      title: 'Sobre mi - Ivan Fibiger',
      description:
        'Quien soy: casi quince anos de cara a la gente, sistemas publicos en produccion y un camino hacia seguridad ofensiva, datos e IA aplicada.',
      url: `${environment.siteUrl}/sobre-mi`,
      type: 'profile',
    });
  }

  ngOnDestroy(): void {
    this.seo.reset();
  }
}

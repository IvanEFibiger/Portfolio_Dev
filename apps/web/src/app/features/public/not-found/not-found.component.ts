import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../../core/services/seo.service';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="not-found-page">
      <div class="not-found-panel">
        <div class="not-found-kicker">404 / ruta no encontrada</div>
        <h1>Esta pantalla no forma parte del sistema.</h1>
        <p>
          Puede que el recurso haya cambiado de lugar o que la URL no exista. Volve al inicio o
          revisa los casos de estudio.
        </p>
        <div class="not-found-actions">
          <a class="button button-primary" routerLink="/">Volver al inicio</a>
          <a class="button button-ghost" routerLink="/proyectos">Ver proyectos</a>
        </div>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundComponent implements OnInit {
  private readonly seo = inject(SeoService);

  ngOnInit(): void {
    this.seo.updateTags({
      title: '404 - Ivan Fibiger',
      description: 'Ruta no encontrada en el portfolio de Ivan Fibiger.',
    });
  }
}

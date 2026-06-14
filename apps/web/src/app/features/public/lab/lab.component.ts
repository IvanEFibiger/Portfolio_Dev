import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { catchError, map, of, startWith } from 'rxjs';
import { LabService } from '../../../core/services/lab.service';
import { SeoService } from '../../../core/services/seo.service';
import { LabCardComponent } from '../../../shared/components/lab-card.component';
import { PageHeaderComponent } from '../../../shared/components/page-header.component';
import {
  EmptyStateComponent,
  ErrorStateComponent,
  LoadingStateComponent,
} from '../../../shared/components/state.components';
import { LabItem } from '../../../shared/models/lab.model';

type LabVm =
  | { state: 'loading' }
  | { state: 'error'; message: string }
  | { state: 'ready'; labs: LabItem[] };

@Component({
  selector: 'app-lab',
  standalone: true,
  imports: [
    AsyncPipe,
    LabCardComponent,
    PageHeaderComponent,
    EmptyStateComponent,
    ErrorStateComponent,
    LoadingStateComponent,
  ],
  template: `
    <app-page-header
      eyebrow="Laboratorio"
      title="Zona de pruebas, aprendizajes y validación técnica"
      description="No es la bitácora. Es el lugar para explorar tecnología, medir restricciones y documentar hallazgos antes de convertirlos en producto."
    />
    <section class="section">
      <div class="container">
        @if (vm$ | async; as vm) {
          @switch (vm.state) {
            @case ('loading') {
              <app-loading-state message="Cargando experimentos..." />
            }
            @case ('error') {
              <app-error-state title="No se pudo cargar el laboratorio" [message]="vm.message" />
            }
            @case ('ready') {
              @if (vm.labs.length) {
                <div class="lab-grid route-reveal">
                  @for (lab of vm.labs; track lab.id) {
                    <app-lab-card [lab]="lab" />
                  }
                </div>
              } @else {
                <app-empty-state
                  title="Laboratorio sin publicaciones"
                  message="Los experimentos archivados no se muestran en esta vista."
                />
              }
            }
          }
        }
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LabComponent implements OnInit {
  readonly vm$ = inject(LabService)
    .getLabs()
    .pipe(
      map((labs): LabVm => ({ state: 'ready', labs })),
      startWith({ state: 'loading' } as LabVm),
      catchError(() =>
        of({
          state: 'error',
          message: 'Reintenta mas tarde; el modulo Lab ya esta conectado a API.',
        } as LabVm),
      ),
    );
  private readonly seo = inject(SeoService);

  ngOnInit(): void {
    this.seo.updateTags({
      title: 'Laboratorio - Ivan Fibiger',
      description:
        'Zona de pruebas, aprendizajes y validacion tecnica. Experimentos documentados, investigaciones activas y notas de aprendizaje.',
    });
  }
}

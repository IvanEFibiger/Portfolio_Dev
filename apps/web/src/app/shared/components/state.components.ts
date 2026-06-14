import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  template: `
    <div class="state-box state-box--empty">
      <span class="state-icon">∅</span>
      <strong>{{ title() }}</strong>
      <p>{{ message() }}</p>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmptyStateComponent {
  readonly title = input('Sin resultados');
  readonly message = input('Todavia no hay contenido para mostrar.');
}

@Component({
  selector: 'app-loading-state',
  standalone: true,
  template: `
    <div class="state-box state-box--loading" aria-live="polite">
      <div class="state-skeleton-grid" aria-hidden="true">
        <span class="skeleton skeleton-title"></span>
        <span class="skeleton skeleton-text"></span>
        <span class="skeleton skeleton-text short"></span>
      </div>
      <strong>Cargando</strong>
      <p>{{ message() }}</p>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingStateComponent {
  readonly message = input('Consultando datos...');
}

@Component({
  selector: 'app-error-state',
  standalone: true,
  template: `
    <div class="state-box state-error" role="status">
      <span class="state-icon">!</span>
      <strong>{{ title() }}</strong>
      <p>{{ message() }}</p>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorStateComponent {
  readonly title = input('No se pudo cargar');
  readonly message = input('Reintenta mas tarde.');
}

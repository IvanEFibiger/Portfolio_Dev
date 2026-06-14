import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-page-header',
  standalone: true,
  template: `
    <header class="page-header container">
      @if (eyebrow()) {
        <div class="eyebrow">{{ eyebrow() }}</div>
      }
      <h1>{{ title() }}</h1>
      @if (description()) {
        <p>{{ description() }}</p>
      }
    </header>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageHeaderComponent {
  readonly eyebrow = input('');
  readonly title = input.required<string>();
  readonly description = input('');
}

import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-section-header',
  standalone: true,
  template: `
    <div class="section-header">
      <div>
        @if (eyebrow()) {
          <p class="eyebrow">{{ eyebrow() }}</p>
        }
        <h2>{{ title() }}</h2>
      </div>
      @if (description()) {
        <p>{{ description() }}</p>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionHeaderComponent {
  readonly eyebrow = input('');
  readonly title = input.required<string>();
  readonly description = input('');
}

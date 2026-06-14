import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-tech-badge',
  standalone: true,
  template: `<span class="tech-badge">{{ label() }}</span>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TechBadgeComponent {
  readonly label = input.required<string>();
}

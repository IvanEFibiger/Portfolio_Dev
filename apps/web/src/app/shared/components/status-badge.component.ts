import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-status-badge',
  standalone: true,
  template: `<span class="status-badge" [class]="'status-' + normalized()">{{ label() }}</span>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatusBadgeComponent {
  readonly label = input.required<string>();

  normalized(): string {
    return this.label().toLowerCase().replace(/\s+/g, '-');
  }
}

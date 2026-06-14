import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { LabItem } from '../models/lab.model';

@Component({
  selector: 'app-lab-card',
  standalone: true,
  imports: [],
  template: `
    <div class="lab-card">
      <div class="lab-header">
        <span
          class="lab-status"
          [class.explorando]="lab().status === 'Explorando'"
          [class.desarrollo]="lab().status === 'En desarrollo'"
          [class.documentado]="lab().status === 'Documentado'"
          [class.archivado]="lab().status === 'Archivado'"
        >
          {{ lab().status }}
        </span>
        <span class="lab-num mono">{{ lab().labNumber }}</span>
      </div>
      <div class="lab-title">{{ lab().title }}</div>
      <div class="lab-desc">{{ lab().description }}</div>
      <div class="lab-stack">
        @for (tech of lab().stack; track tech) {
          <span class="tech-badge">{{ tech }}</span>
        }
      </div>
      <div class="lab-learning">{{ lab().learning }}</div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LabCardComponent {
  readonly lab = input.required<LabItem>();
}

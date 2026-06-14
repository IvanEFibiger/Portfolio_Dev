import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ArticleSummary } from '../models/article.model';

@Component({
  selector: 'app-article-card',
  standalone: true,
  imports: [RouterLink, DatePipe],
  template: `
    <a [routerLink]="['/bitacora', article().slug]" class="article-row">
      <div class="article-meta">
        <span
          class="article-cat"
          [class.backend]="
            article().category.toLowerCase().includes('backend') ||
            article().category.toLowerCase().includes('devops')
          "
          [class.security]="article().category.toLowerCase().includes('seguridad')"
          [class.systems]="article().category.toLowerCase().includes('sistemas')"
        >
          {{ article().category }}
        </span>
        <span class="article-date mono">{{ article().publishedAt | date: 'MMM yyyy' }}</span>
        <span class="article-read mono">{{ article().readingTimeMinutes }} min</span>
      </div>

      <div class="article-body">
        <div class="article-title">{{ article().title }}</div>
        <div class="article-excerpt">{{ article().excerpt }}</div>
        <div class="article-tags">
          @for (tag of article().tags; track tag) {
            <span class="article-tag">{{ tag }}</span>
          }
        </div>
      </div>

      <div class="article-arrow">›</div>
    </a>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleCardComponent {
  readonly article = input.required<ArticleSummary>();
}

import { AsyncPipe, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnDestroy } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map, switchMap, tap } from 'rxjs';
import { ArticlesService } from '../../../core/services/articles.service';
import { SeoService } from '../../../core/services/seo.service';
import { environment } from '../../../../environments/environment';
import { ContentBlockRendererComponent } from '../../../shared/components/content-block-renderer.component';
import { EmptyStateComponent } from '../../../shared/components/state.components';
import { TechBadgeComponent } from '../../../shared/components/tech-badge.component';

@Component({
  selector: 'app-article-detail',
  standalone: true,
  imports: [
    AsyncPipe,
    DatePipe,
    RouterLink,
    ContentBlockRendererComponent,
    EmptyStateComponent,
    TechBadgeComponent,
  ],
  template: `
    @if (article$ | async; as article) {
      <article class="article-detail">
        <a class="text-link" routerLink="/bitacora">Volver a bitácora</a>
        <header class="case-hero">
          <p class="eyebrow">{{ article.category }} · {{ article.readingTimeMinutes }} min</p>
          <h1>{{ article.title }}</h1>
          <p>{{ article.excerpt }}</p>
          @if (article.publishedAt) {
            <small>Publicado {{ article.publishedAt | date: 'dd/MM/yyyy' }}</small>
          }
          <div class="badge-row">
            @for (tag of article.tags; track tag) {
              <app-tech-badge [label]="tag" />
            }
          </div>
        </header>
        <app-content-block-renderer [blocks]="article.content.blocks" />
      </article>
    } @else {
      <app-empty-state
        title="Articulo no encontrado"
        message="La nota solicitada no existe o no esta publicada."
      />
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleDetailComponent implements OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private readonly articles = inject(ArticlesService);
  private readonly seo = inject(SeoService);

  readonly article$ = this.route.paramMap.pipe(
    map((params) => params.get('slug') ?? ''),
    switchMap((slug) =>
      this.articles.getArticleBySlug(slug).pipe(
        tap((article) => {
          if (article) {
            const image = article.coverImageUrl
              ? article.coverImageUrl.startsWith('http')
                ? article.coverImageUrl
                : `${environment.siteUrl}${article.coverImageUrl}`
              : undefined;

            this.seo.updateTags({
              title: article.seoTitle || article.title,
              description: article.seoDescription || article.excerpt,
              image,
              url: `${environment.siteUrl}/bitacora/${article.slug}`,
              type: 'article',
            });

            this.seo.setJsonLd({
              '@context': 'https://schema.org',
              '@type': 'BlogPosting',
              headline: article.title,
              description: article.seoDescription || article.excerpt,
              author: {
                '@type': 'Person',
                name: 'Ivan Fibiger',
              },
              datePublished: article.publishedAt,
              url: `${environment.siteUrl}/bitacora/${article.slug}`,
              image,
            });
          }
        }),
      ),
    ),
  );

  ngOnDestroy(): void {
    this.seo.reset();
  }
}

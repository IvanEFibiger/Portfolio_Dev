import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { catchError, map, of, startWith } from 'rxjs';
import { ArticlesService } from '../../../core/services/articles.service';
import { ArticleCardComponent } from '../../../shared/components/article-card.component';
import { PageHeaderComponent } from '../../../shared/components/page-header.component';
import {
  EmptyStateComponent,
  ErrorStateComponent,
  LoadingStateComponent,
} from '../../../shared/components/state.components';
import { ArticleSummary } from '../../../shared/models/article.model';

type ArticlesVm =
  | { state: 'loading' }
  | { state: 'error'; message: string }
  | { state: 'ready'; articles: ArticleSummary[] };

@Component({
  selector: 'app-articles',
  standalone: true,
  imports: [
    AsyncPipe,
    ArticleCardComponent,
    PageHeaderComponent,
    EmptyStateComponent,
    ErrorStateComponent,
    LoadingStateComponent,
  ],
  template: `
    <app-page-header
      eyebrow="Bitácora técnica"
      title="Notas sobre arquitectura, backend y seguridad aplicada"
      description="Contenido preparado para venir desde API y renderizar bloques estructurados, sin Markdown local."
    />
    <section class="section section--alt">
      <div class="container">
        @if (vm$ | async; as vm) {
          @switch (vm.state) {
            @case ('loading') {
              <app-loading-state message="Cargando notas tecnicas..." />
            }
            @case ('error') {
              <app-error-state title="No se pudo cargar la bitacora" [message]="vm.message" />
            }
            @case ('ready') {
              @if (vm.articles.length) {
                <div class="articles-list route-reveal">
                  @for (article of vm.articles; track article.id) {
                    <app-article-card [article]="article" />
                  }
                </div>
              } @else {
                <app-empty-state
                  title="Todavia no hay notas publicadas"
                  message="El editor ya esta preparado; falta publicar contenido."
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
export class ArticlesComponent {
  readonly vm$ = inject(ArticlesService)
    .getArticles()
    .pipe(
      map((articles): ArticlesVm => ({ state: 'ready', articles })),
      startWith({ state: 'loading' } as ArticlesVm),
      catchError(() =>
        of({
          state: 'error',
          message: 'Reintenta mas tarde o revisa los proyectos mientras tanto.',
        } as ArticlesVm),
      ),
    );
}

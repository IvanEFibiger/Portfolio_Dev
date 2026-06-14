import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  map,
  of,
  startWith,
  Subject,
  switchMap,
} from 'rxjs';
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
        <div class="form-field route-reveal">
          <label class="form-label" for="articles-search">Buscar en la bitácora</label>
          <input
            id="articles-search"
            class="form-input"
            type="search"
            [value]="searchTerm()"
            placeholder="Buscar por título, categoría o tag"
            (input)="onSearch($any($event.target).value)"
          />
        </div>

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
  private readonly articlesService = inject(ArticlesService);
  private readonly searchTerms = new Subject<string>();

  readonly searchTerm = signal('');

  readonly vm$ = this.searchTerms.pipe(
    startWith(''),
    debounceTime(300),
    distinctUntilChanged(),
    switchMap((q) =>
      this.articlesService.searchArticles(q).pipe(
        map((articles): ArticlesVm => ({ state: 'ready', articles })),
        startWith({ state: 'loading' } as ArticlesVm),
        catchError(() =>
          of({
            state: 'error',
            message: 'Reintenta mas tarde o revisa los proyectos mientras tanto.',
          } as ArticlesVm),
        ),
      ),
    ),
  );

  onSearch(q: string): void {
    this.searchTerm.set(q);
    this.searchTerms.next(q);
  }
}

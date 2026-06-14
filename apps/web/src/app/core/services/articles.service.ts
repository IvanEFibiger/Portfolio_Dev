import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { MOCK_ARTICLES } from '../../shared/mocks/articles.mock';
import { ArticleDetail, ArticleSummary } from '../../shared/models/article.model';

@Injectable({ providedIn: 'root' })
export class ArticlesService {
  private readonly http = inject(HttpClient);

  getArticles(): Observable<ArticleSummary[]> {
    if (environment.useMocks) {
      return of(MOCK_ARTICLES.filter((article) => article.status === 'published'));
    }

    return this.http.get<ArticleSummary[]>(`${environment.apiBaseUrl}/public/articles`);
  }

  getLatestArticles(limit = 3): Observable<ArticleSummary[]> {
    if (environment.useMocks) {
      return of(
        MOCK_ARTICLES.filter((article) => article.status === 'published')
          .sort((a, b) => String(b.publishedAt).localeCompare(String(a.publishedAt)))
          .slice(0, limit),
      );
    }

    return this.http.get<ArticleSummary[]>(`${environment.apiBaseUrl}/public/articles`, {
      params: { limit },
    });
  }

  getArticleBySlug(slug: string): Observable<ArticleDetail | null> {
    if (environment.useMocks) {
      return of(
        MOCK_ARTICLES.find((article) => article.slug === slug && article.status === 'published') ??
          null,
      );
    }

    return this.http.get<ArticleDetail>(`${environment.apiBaseUrl}/public/articles/${slug}`);
  }
}

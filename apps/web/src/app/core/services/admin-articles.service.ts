import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { MOCK_ARTICLES } from '../../shared/mocks/articles.mock';
import { ArticleDetail, ArticleFormValue, ArticleSummary } from '../../shared/models/article.model';

@Injectable({ providedIn: 'root' })
export class AdminArticlesService {
  private readonly http = inject(HttpClient);

  getArticles(): Observable<ArticleSummary[]> {
    if (environment.useMocks) {
      return of(MOCK_ARTICLES);
    }

    return this.http.get<ArticleSummary[]>(`${environment.apiBaseUrl}/admin/articles`);
  }

  getArticle(id: string): Observable<ArticleDetail | null> {
    if (environment.useMocks) {
      return of(MOCK_ARTICLES.find((article) => article.id === id) ?? null);
    }

    return this.http.get<ArticleDetail>(`${environment.apiBaseUrl}/admin/articles/${id}`);
  }

  saveArticle(value: ArticleFormValue, id?: string): Observable<ArticleDetail> {
    const payload = {
      title: value.title,
      slug: value.slug,
      excerpt: value.excerpt,
      category: value.category,
      tags: value.tags
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean),
      seoTitle: value.seoTitle,
      seoDescription: value.seoDescription,
      status: value.status,
      content: { blocks: value.blocks },
    };

    if (environment.useMocks) {
      return of({
        id: id ?? 'mock-new-article',
        publishedAt: null,
        readingTimeMinutes: 4,
        ...payload,
      } as ArticleDetail);
    }

    return id
      ? this.http.patch<ArticleDetail>(`${environment.apiBaseUrl}/admin/articles/${id}`, payload)
      : this.http.post<ArticleDetail>(`${environment.apiBaseUrl}/admin/articles`, payload);
  }

  publish(id: string): Observable<void> {
    if (environment.useMocks) {
      return of(void 0);
    }

    return this.http.patch<void>(`${environment.apiBaseUrl}/admin/articles/${id}/publish`, {});
  }

  unpublish(id: string): Observable<void> {
    if (environment.useMocks) {
      return of(void 0);
    }

    return this.http.patch<void>(`${environment.apiBaseUrl}/admin/articles/${id}/unpublish`, {});
  }

  deleteArticle(id: string): Observable<void> {
    if (environment.useMocks) {
      return of(void 0);
    }

    return this.http.delete<void>(`${environment.apiBaseUrl}/admin/articles/${id}`);
  }
}

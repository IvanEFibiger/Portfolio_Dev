import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ArticleReactions, ArticleReactionType } from '../../shared/models/article-reaction.model';

const EMPTY_REACTIONS: ArticleReactions = {
  counts: { like: 0, fire: 0 },
  total: 0,
  viewerReaction: null,
};

@Injectable({ providedIn: 'root' })
export class ArticleReactionsService {
  private readonly http = inject(HttpClient);

  getReactions(slug: string): Observable<ArticleReactions> {
    if (environment.useMocks) return of(EMPTY_REACTIONS);
    return this.http.get<ArticleReactions>(
      `${environment.apiBaseUrl}/public/articles/${slug}/reactions`,
    );
  }

  react(slug: string, reactionType: ArticleReactionType): Observable<ArticleReactions> {
    if (environment.useMocks) {
      return of({
        counts: { like: reactionType === 'like' ? 1 : 0, fire: reactionType === 'fire' ? 1 : 0 },
        total: 1,
        viewerReaction: reactionType,
      });
    }

    return this.http.post<ArticleReactions>(
      `${environment.apiBaseUrl}/public/articles/${slug}/reactions`,
      {
        reactionType,
      },
    );
  }
}

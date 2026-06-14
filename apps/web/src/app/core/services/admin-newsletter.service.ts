import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { MOCK_NEWSLETTER } from '../../shared/mocks/admin.mock';
import { NewsletterSubscriber } from '../../shared/models/newsletter.model';

@Injectable({ providedIn: 'root' })
export class AdminNewsletterService {
  private readonly http = inject(HttpClient);

  getSubscribers(): Observable<NewsletterSubscriber[]> {
    if (environment.useMocks) {
      return of(MOCK_NEWSLETTER);
    }

    return this.http.get<NewsletterSubscriber[]>(
      `${environment.apiBaseUrl}/admin/newsletter/subscribers`,
    );
  }
}

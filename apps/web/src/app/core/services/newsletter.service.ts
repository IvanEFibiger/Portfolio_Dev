import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class NewsletterService {
  private readonly http = inject(HttpClient);

  subscribe(email: string): Observable<{ message: string }> {
    if (environment.useMocks) {
      return of({ message: 'Suscripcion registrada en modo mock.' });
    }

    return this.http.post<{ message: string }>(`${environment.apiBaseUrl}/newsletter/subscribe`, {
      email,
    });
  }
}

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { MOCK_CONTACT_MESSAGES } from '../../shared/mocks/admin.mock';
import { ContactMessage, ContactMessageStatus } from '../../shared/models/contact.model';

@Injectable({ providedIn: 'root' })
export class AdminContactMessagesService {
  private readonly http = inject(HttpClient);

  getMessages(): Observable<ContactMessage[]> {
    if (environment.useMocks) {
      return of(MOCK_CONTACT_MESSAGES);
    }

    return this.http.get<ContactMessage[]>(`${environment.apiBaseUrl}/admin/contact-messages`);
  }

  updateStatus(id: string, status: Exclude<ContactMessageStatus, 'new'>): Observable<void> {
    if (environment.useMocks) {
      return of(void 0);
    }

    return this.http.patch<void>(`${environment.apiBaseUrl}/admin/contact-messages/${id}/status`, {
      status,
    });
  }
}

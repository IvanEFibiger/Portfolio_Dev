import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ContactPayload } from '../../shared/models/contact.model';

@Injectable({ providedIn: 'root' })
export class ContactService {
  private readonly http = inject(HttpClient);

  sendMessage(payload: ContactPayload): Observable<{ message: string }> {
    if (environment.useMocks) {
      // TODO: Reemplazar por POST /contact cuando el backend este disponible para el frontend.
      return of({ message: `Mensaje recibido: ${payload.subject ?? 'Contacto profesional'}` }).pipe(
        delay(350),
      );
    }

    return this.http.post<{ message: string }>(`${environment.apiBaseUrl}/contact`, payload);
  }
}

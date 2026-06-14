import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { MOCK_LABS } from '../../shared/mocks/labs.mock';
import { LabItem } from '../../shared/models/lab.model';

@Injectable({ providedIn: 'root' })
export class LabService {
  private readonly http = inject(HttpClient);

  getLabs(): Observable<LabItem[]> {
    if (environment.useMocks) {
      return of([...MOCK_LABS].sort((a, b) => a.sortOrder - b.sortOrder));
    }

    return this.http.get<LabItem[]>(`${environment.apiBaseUrl}/public/lab`);
  }

  getLabBySlug(slug: string): Observable<LabItem | null> {
    if (environment.useMocks) {
      return of(MOCK_LABS.find((lab) => lab.slug === slug) ?? null);
    }

    return this.http.get<LabItem>(`${environment.apiBaseUrl}/public/lab/${slug}`);
  }
}

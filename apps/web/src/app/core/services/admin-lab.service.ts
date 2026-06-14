import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { MOCK_LABS } from '../../shared/mocks/labs.mock';
import { LabFormValue, LabItem } from '../../shared/models/lab.model';

@Injectable({ providedIn: 'root' })
export class AdminLabService {
  private readonly http = inject(HttpClient);

  getLabs(): Observable<LabItem[]> {
    if (environment.useMocks) {
      return of([...MOCK_LABS].sort((a, b) => a.sortOrder - b.sortOrder));
    }

    return this.http.get<LabItem[]>(`${environment.apiBaseUrl}/admin/lab`);
  }

  getLab(id: string): Observable<LabItem | null> {
    if (environment.useMocks) {
      return of(MOCK_LABS.find((lab) => lab.id === id) ?? null);
    }

    return this.http.get<LabItem>(`${environment.apiBaseUrl}/admin/lab/${id}`);
  }

  saveLab(value: LabFormValue, id?: string): Observable<LabItem> {
    const payload = {
      labNumber: value.labNumber,
      title: value.title,
      slug: value.slug,
      description: value.description,
      status: value.status,
      stack: value.stack
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean),
      learning: value.learning,
      sortOrder: value.sortOrder,
    };

    if (environment.useMocks) {
      return of({ id: id ?? 'mock-new-lab', ...payload } as LabItem);
    }

    return id
      ? this.http.patch<LabItem>(`${environment.apiBaseUrl}/admin/lab/${id}`, payload)
      : this.http.post<LabItem>(`${environment.apiBaseUrl}/admin/lab`, payload);
  }

  deleteLab(id: string): Observable<void> {
    if (environment.useMocks) {
      return of(void 0);
    }

    return this.http.delete<void>(`${environment.apiBaseUrl}/admin/lab/${id}`);
  }
}

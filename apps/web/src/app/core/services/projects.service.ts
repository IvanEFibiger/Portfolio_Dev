import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { MOCK_PROJECTS } from '../../shared/mocks/projects.mock';
import { ProjectDetail, ProjectSummary } from '../../shared/models/project.model';

@Injectable({ providedIn: 'root' })
export class ProjectsService {
  private readonly http = inject(HttpClient);

  getProjects(): Observable<ProjectSummary[]> {
    if (environment.useMocks) {
      return of(MOCK_PROJECTS.sort((a, b) => a.sortOrder - b.sortOrder));
    }

    return this.http.get<ProjectSummary[]>(`${environment.apiBaseUrl}/public/projects`);
  }

  getFeaturedProjects(limit = 5): Observable<ProjectSummary[]> {
    if (environment.useMocks) {
      return of(
        MOCK_PROJECTS.filter((project) => project.featured)
          .sort((a, b) => a.sortOrder - b.sortOrder)
          .slice(0, limit),
      );
    }

    return this.getProjects();
  }

  getProjectBySlug(slug: string): Observable<ProjectDetail | null> {
    if (environment.useMocks) {
      return of(MOCK_PROJECTS.find((project) => project.slug === slug) ?? null);
    }

    return this.http.get<ProjectDetail>(`${environment.apiBaseUrl}/public/projects/${slug}`);
  }
}

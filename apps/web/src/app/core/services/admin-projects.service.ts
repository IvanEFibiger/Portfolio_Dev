import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { MOCK_PROJECTS } from '../../shared/mocks/projects.mock';
import { ProjectDetail, ProjectFormValue, ProjectSummary } from '../../shared/models/project.model';

@Injectable({ providedIn: 'root' })
export class AdminProjectsService {
  private readonly http = inject(HttpClient);

  getProjects(): Observable<ProjectSummary[]> {
    if (environment.useMocks) {
      return of(MOCK_PROJECTS);
    }

    return this.http.get<ProjectSummary[]>(`${environment.apiBaseUrl}/admin/projects`);
  }

  getProject(id: string): Observable<ProjectDetail | null> {
    if (environment.useMocks) {
      return of(MOCK_PROJECTS.find((project) => project.id === id) ?? null);
    }

    return this.http.get<ProjectDetail>(`${environment.apiBaseUrl}/admin/projects/${id}`);
  }

  saveProject(value: ProjectFormValue, id?: string): Observable<ProjectDetail> {
    const payload = {
      title: value.title,
      slug: value.slug,
      summary: value.summary,
      problem: value.problem,
      solution: value.solution,
      architecture: value.architecture,
      stack: value.stack
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean),
      status: value.status,
      featured: value.featured,
      sortOrder: value.sortOrder,
      repositoryUrl: value.repositoryUrl || null,
      demoUrl: value.demoUrl || null,
      type: value.type || null,
      operationalStatus: value.operationalStatus || null,
      complexity: value.complexity || null,
      context: value.context || null,
      objective: value.objective || null,
      restrictions: value.restrictions
        .split('\n')
        .map((item) => item.trim())
        .filter(Boolean),
      role: value.role || null,
      technicalDecisions: value.technicalDecisions
        .split('\n')
        .map((item) => item.trim())
        .filter(Boolean),
      security: value.security
        .split('\n')
        .map((item) => item.trim())
        .filter(Boolean),
      result: value.result || null,
      learnings: value.learnings || null,
      improvements: value.improvements || null,
      highlights: value.highlights
        .split('\n')
        .map((item) => item.trim())
        .filter(Boolean),
    };

    if (environment.useMocks) {
      return of({
        id: id ?? 'mock-new-project',
        ...payload,
        description: null,
        coverImageUrl: null,
        operationalStatus:
          (payload.operationalStatus as ProjectDetail['operationalStatus']) ?? 'active',
        context: payload.context ?? '',
        objective: payload.objective ?? '',
        restrictions: payload.restrictions,
        technicalDecisions: payload.technicalDecisions,
        security: payload.security,
        result: payload.result ?? '',
        learnings: payload.learnings ?? '',
        improvements: payload.improvements ?? '',
        highlights: payload.highlights,
        role: payload.role ?? '',
      } as ProjectDetail);
    }

    return id
      ? this.http.patch<ProjectDetail>(`${environment.apiBaseUrl}/admin/projects/${id}`, payload)
      : this.http.post<ProjectDetail>(`${environment.apiBaseUrl}/admin/projects`, payload);
  }

  deleteProject(id: string): Observable<void> {
    if (environment.useMocks) {
      return of(void 0);
    }

    return this.http.delete<void>(`${environment.apiBaseUrl}/admin/projects/${id}`);
  }
}

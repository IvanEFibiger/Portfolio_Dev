import { Project, ProjectStatus } from '../../domain/entities/project.entity';
import { ProjectOrmEntity } from './project.orm-entity';

export class ProjectMapper {
  static toDomain(orm: ProjectOrmEntity): Project {
    return new Project(
      orm.id,
      orm.title,
      orm.slug,
      orm.summary,
      orm.description ?? null,
      orm.problem ?? null,
      orm.solution ?? null,
      orm.architecture ?? null,
      orm.stack,
      orm.status as ProjectStatus,
      orm.featured,
      orm.repositoryUrl ?? null,
      orm.demoUrl ?? null,
      orm.coverImageUrl ?? null,
      orm.sortOrder,
      orm.type ?? null,
      (orm.operationalStatus as Project['operationalStatus']) ?? null,
      orm.complexity ?? null,
      orm.context ?? null,
      orm.objective ?? null,
      orm.restrictions ?? [],
      orm.technicalDecisions ?? [],
      orm.security ?? [],
      orm.result ?? null,
      orm.learnings ?? null,
      orm.improvements ?? null,
      orm.highlights ?? [],
      orm.role ?? null,
      orm.createdAt,
      orm.updatedAt,
    );
  }

  static toOrm(domain: Project): Partial<ProjectOrmEntity> {
    return {
      id: domain.id,
      title: domain.title,
      slug: domain.slug,
      summary: domain.summary,
      description: domain.description ?? undefined,
      problem: domain.problem ?? undefined,
      solution: domain.solution ?? undefined,
      architecture: domain.architecture ?? undefined,
      stack: domain.stack,
      status: domain.status,
      featured: domain.featured,
      repositoryUrl: domain.repositoryUrl ?? undefined,
      demoUrl: domain.demoUrl ?? undefined,
      coverImageUrl: domain.coverImageUrl ?? undefined,
      sortOrder: domain.sortOrder,
      type: domain.type ?? undefined,
      operationalStatus: domain.operationalStatus ?? undefined,
      complexity: domain.complexity ?? undefined,
      context: domain.context ?? undefined,
      objective: domain.objective ?? undefined,
      restrictions: domain.restrictions ?? [],
      technicalDecisions: domain.technicalDecisions ?? [],
      security: domain.security ?? [],
      result: domain.result ?? undefined,
      learnings: domain.learnings ?? undefined,
      improvements: domain.improvements ?? undefined,
      highlights: domain.highlights ?? [],
      role: domain.role ?? undefined,
    };
  }
}

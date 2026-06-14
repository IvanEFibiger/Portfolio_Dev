import { Inject, Injectable } from '@nestjs/common';
import {
  PROJECT_REPOSITORY,
  ProjectRepositoryPort,
} from '../../domain/ports/project.repository.port';
import { Project } from '../../domain/entities/project.entity';

@Injectable()
export class GetPublicProjectsUseCase {
  constructor(
    @Inject(PROJECT_REPOSITORY)
    private readonly projectRepository: ProjectRepositoryPort,
  ) {}

  async execute(q?: string): Promise<Project[]> {
    const projects = await this.projectRepository.findAllPublished();
    if (!q || !q.trim()) return projects;
    const term = q.trim().toLowerCase();
    return projects.filter((p) =>
      [p.title, p.summary, p.type ?? '', ...(p.stack ?? [])].join(' ').toLowerCase().includes(term),
    );
  }
}

@Injectable()
export class GetAllProjectsUseCase {
  constructor(
    @Inject(PROJECT_REPOSITORY)
    private readonly projectRepository: ProjectRepositoryPort,
  ) {}

  async execute(): Promise<Project[]> {
    return this.projectRepository.findAll();
  }
}

@Injectable()
export class GetProjectByIdUseCase {
  constructor(
    @Inject(PROJECT_REPOSITORY)
    private readonly projectRepository: ProjectRepositoryPort,
  ) {}

  async execute(id: string): Promise<Project | null> {
    return this.projectRepository.findById(id);
  }
}

@Injectable()
export class GetProjectBySlugUseCase {
  constructor(
    @Inject(PROJECT_REPOSITORY)
    private readonly projectRepository: ProjectRepositoryPort,
  ) {}

  async execute(slug: string): Promise<Project | null> {
    const project = await this.projectRepository.findBySlug(slug);
    if (!project || !project.isPublished()) return null;
    return project;
  }
}

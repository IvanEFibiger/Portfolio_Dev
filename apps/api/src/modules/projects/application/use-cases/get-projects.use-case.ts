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

  async execute(): Promise<Project[]> {
    return this.projectRepository.findAllPublished();
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

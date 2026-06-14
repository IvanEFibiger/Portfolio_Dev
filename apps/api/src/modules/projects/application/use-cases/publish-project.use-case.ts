import { Inject, Injectable } from '@nestjs/common';
import {
  PROJECT_REPOSITORY,
  ProjectRepositoryPort,
} from '../../domain/ports/project.repository.port';
import { Project } from '../../domain/entities/project.entity';
import { ProjectNotFoundError } from '../../domain/errors/project-not-found.error';

@Injectable()
export class PublishProjectUseCase {
  constructor(
    @Inject(PROJECT_REPOSITORY)
    private readonly projectRepository: ProjectRepositoryPort,
  ) {}

  async execute(id: string): Promise<Project> {
    const project = await this.projectRepository.findById(id);
    if (!project) throw new ProjectNotFoundError(id);

    project.publish();
    return this.projectRepository.save(project);
  }
}

@Injectable()
export class UnpublishProjectUseCase {
  constructor(
    @Inject(PROJECT_REPOSITORY)
    private readonly projectRepository: ProjectRepositoryPort,
  ) {}

  async execute(id: string): Promise<Project> {
    const project = await this.projectRepository.findById(id);
    if (!project) throw new ProjectNotFoundError(id);

    project.unpublish();
    return this.projectRepository.save(project);
  }
}

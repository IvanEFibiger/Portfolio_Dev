import { Inject, Injectable } from '@nestjs/common';
import {
  PROJECT_REPOSITORY,
  ProjectRepositoryPort,
} from '../../domain/ports/project.repository.port';
import { UpdateProjectDto } from '../dto/update-project.dto';
import { Project } from '../../domain/entities/project.entity';
import { ProjectNotFoundError } from '../../domain/errors/project-not-found.error';

@Injectable()
export class UpdateProjectUseCase {
  constructor(
    @Inject(PROJECT_REPOSITORY)
    private readonly projectRepository: ProjectRepositoryPort,
  ) {}

  async execute(id: string, dto: UpdateProjectDto): Promise<Project> {
    const project = await this.projectRepository.findById(id);
    if (!project) throw new ProjectNotFoundError(id);

    if (dto.title !== undefined) project.title = dto.title;
    if (dto.slug !== undefined) project.slug = dto.slug;
    if (dto.summary !== undefined) project.summary = dto.summary;
    if (dto.description !== undefined) project.description = dto.description ?? null;
    if (dto.problem !== undefined) project.problem = dto.problem ?? null;
    if (dto.solution !== undefined) project.solution = dto.solution ?? null;
    if (dto.architecture !== undefined) project.architecture = dto.architecture ?? null;
    if (dto.stack !== undefined) project.stack = dto.stack;
    if (dto.status !== undefined) project.status = dto.status as Project['status'];
    if (dto.featured !== undefined) project.featured = dto.featured;
    if (dto.repositoryUrl !== undefined) project.repositoryUrl = dto.repositoryUrl ?? null;
    if (dto.demoUrl !== undefined) project.demoUrl = dto.demoUrl ?? null;
    if (dto.coverImageUrl !== undefined) project.coverImageUrl = dto.coverImageUrl ?? null;
    if (dto.sortOrder !== undefined) project.sortOrder = dto.sortOrder;
    if (dto.type !== undefined) project.type = dto.type ?? null;
    if (dto.operationalStatus !== undefined)
      project.operationalStatus = (dto.operationalStatus as Project['operationalStatus']) ?? null;
    if (dto.complexity !== undefined) project.complexity = dto.complexity ?? null;
    if (dto.context !== undefined) project.context = dto.context ?? null;
    if (dto.objective !== undefined) project.objective = dto.objective ?? null;
    if (dto.restrictions !== undefined) project.restrictions = dto.restrictions ?? [];
    if (dto.technicalDecisions !== undefined)
      project.technicalDecisions = dto.technicalDecisions ?? [];
    if (dto.security !== undefined) project.security = dto.security ?? [];
    if (dto.result !== undefined) project.result = dto.result ?? null;
    if (dto.learnings !== undefined) project.learnings = dto.learnings ?? null;
    if (dto.improvements !== undefined) project.improvements = dto.improvements ?? null;
    if (dto.highlights !== undefined) project.highlights = dto.highlights ?? [];
    if (dto.role !== undefined) project.role = dto.role ?? null;

    return this.projectRepository.save(project);
  }
}

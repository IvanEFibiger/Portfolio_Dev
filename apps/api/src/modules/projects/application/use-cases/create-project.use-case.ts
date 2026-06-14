import { Inject, Injectable } from '@nestjs/common';
import {
  PROJECT_REPOSITORY,
  ProjectRepositoryPort,
} from '../../domain/ports/project.repository.port';
import { CreateProjectDto } from '../dto/create-project.dto';
import { Project } from '../../domain/entities/project.entity';

@Injectable()
export class CreateProjectUseCase {
  constructor(
    @Inject(PROJECT_REPOSITORY)
    private readonly projectRepository: ProjectRepositoryPort,
  ) {}

  async execute(dto: CreateProjectDto): Promise<Project> {
    const baseSlug = dto.slug ? this.sanitizeSlug(dto.slug) : this.generateSlug(dto.title);

    const existing = await this.projectRepository.findBySlug(baseSlug);
    const finalSlug = existing ? `${baseSlug}-${Date.now()}` : baseSlug;

    return this.projectRepository.create({
      title: dto.title,
      slug: finalSlug,
      summary: dto.summary,
      description: dto.description ?? null,
      problem: dto.problem ?? null,
      solution: dto.solution ?? null,
      architecture: dto.architecture ?? null,
      stack: dto.stack,
      status: (dto.status as Project['status']) ?? 'draft',
      featured: dto.featured ?? false,
      repositoryUrl: dto.repositoryUrl ?? null,
      demoUrl: dto.demoUrl ?? null,
      coverImageUrl: dto.coverImageUrl ?? null,
      sortOrder: dto.sortOrder ?? 0,
      type: dto.type ?? null,
      operationalStatus: (dto.operationalStatus as Project['operationalStatus']) ?? null,
      complexity: dto.complexity ?? null,
      context: dto.context ?? null,
      objective: dto.objective ?? null,
      restrictions: dto.restrictions ?? [],
      technicalDecisions: dto.technicalDecisions ?? [],
      security: dto.security ?? [],
      result: dto.result ?? null,
      learnings: dto.learnings ?? null,
      improvements: dto.improvements ?? null,
      highlights: dto.highlights ?? [],
      role: dto.role ?? null,
    });
  }

  private generateSlug(title: string): string {
    return title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  }

  private sanitizeSlug(slug: string): string {
    return slug
      .toLowerCase()
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  }
}

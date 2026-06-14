import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from '../../domain/entities/project.entity';
import {
  CreateProjectData,
  ProjectRepositoryPort,
} from '../../domain/ports/project.repository.port';
import { ProjectOrmEntity } from './project.orm-entity';
import { ProjectMapper } from './project.mapper';

@Injectable()
export class ProjectTypeOrmRepository implements ProjectRepositoryPort {
  constructor(
    @InjectRepository(ProjectOrmEntity)
    private readonly repo: Repository<ProjectOrmEntity>,
  ) {}

  async findById(id: string): Promise<Project | null> {
    const entity = await this.repo.findOne({ where: { id } });
    return entity ? ProjectMapper.toDomain(entity) : null;
  }

  async findBySlug(slug: string): Promise<Project | null> {
    const entity = await this.repo.findOne({ where: { slug } });
    return entity ? ProjectMapper.toDomain(entity) : null;
  }

  async findAllPublished(): Promise<Project[]> {
    const entities = await this.repo.find({
      where: { status: 'published' },
      order: { sortOrder: 'ASC' },
    });
    return entities.map(ProjectMapper.toDomain);
  }

  async findAll(): Promise<Project[]> {
    const entities = await this.repo.find({ order: { sortOrder: 'ASC' } });
    return entities.map(ProjectMapper.toDomain);
  }

  async save(project: Project): Promise<Project> {
    const ormData = ProjectMapper.toOrm(project);
    const saved = await this.repo.save(ormData);
    const full = await this.repo.findOneOrFail({ where: { id: saved.id } });
    return ProjectMapper.toDomain(full);
  }

  async create(data: CreateProjectData): Promise<Project> {
    const entity = this.repo.create({
      title: data.title,
      slug: data.slug,
      summary: data.summary,
      description: data.description ?? undefined,
      problem: data.problem ?? undefined,
      solution: data.solution ?? undefined,
      architecture: data.architecture ?? undefined,
      stack: data.stack,
      status: data.status,
      featured: data.featured,
      repositoryUrl: data.repositoryUrl ?? undefined,
      demoUrl: data.demoUrl ?? undefined,
      coverImageUrl: data.coverImageUrl ?? undefined,
      sortOrder: data.sortOrder,
      type: data.type ?? undefined,
      operationalStatus: data.operationalStatus ?? undefined,
      complexity: data.complexity ?? undefined,
      context: data.context ?? undefined,
      objective: data.objective ?? undefined,
      restrictions: data.restrictions ?? [],
      technicalDecisions: data.technicalDecisions ?? [],
      security: data.security ?? [],
      result: data.result ?? undefined,
      learnings: data.learnings ?? undefined,
      improvements: data.improvements ?? undefined,
      highlights: data.highlights ?? [],
      role: data.role ?? undefined,
    });
    const saved = await this.repo.save(entity);
    return ProjectMapper.toDomain(saved);
  }

  async delete(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}

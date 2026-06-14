import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SkipThrottle } from '@nestjs/throttler';
import {
  GetPublicProjectsUseCase,
  GetProjectBySlugUseCase,
} from '../../application/use-cases/get-projects.use-case';

@ApiTags('Public Projects')
@Controller('public/projects')
@SkipThrottle()
export class PublicProjectsController {
  constructor(
    private readonly getPublicProjects: GetPublicProjectsUseCase,
    private readonly getProjectBySlug: GetProjectBySlugUseCase,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Listar proyectos publicados' })
  async findAll() {
    const projects = await this.getPublicProjects.execute();
    return projects.map((p) => ({
      id: p.id,
      title: p.title,
      slug: p.slug,
      summary: p.summary,
      stack: p.stack,
      featured: p.featured,
      coverImageUrl: p.coverImageUrl,
      demoUrl: p.demoUrl,
      repositoryUrl: p.repositoryUrl,
      sortOrder: p.sortOrder,
      type: p.type,
      operationalStatus: p.operationalStatus,
      complexity: p.complexity,
      highlights: p.highlights,
    }));
  }

  @Get(':slug')
  @ApiOperation({ summary: 'Obtener proyecto publicado por slug' })
  async findBySlug(@Param('slug') slug: string) {
    const project = await this.getProjectBySlug.execute(slug);
    if (!project) throw new NotFoundException('Proyecto no encontrado');
    return project;
  }
}

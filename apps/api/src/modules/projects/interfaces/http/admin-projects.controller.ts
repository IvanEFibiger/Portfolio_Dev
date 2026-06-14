import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@common/guards/jwt-auth.guard';
import { CreateProjectDto } from '../../application/dto/create-project.dto';
import { UpdateProjectDto } from '../../application/dto/update-project.dto';
import { CreateProjectUseCase } from '../../application/use-cases/create-project.use-case';
import {
  GetAllProjectsUseCase,
  GetProjectByIdUseCase,
} from '../../application/use-cases/get-projects.use-case';
import { UpdateProjectUseCase } from '../../application/use-cases/update-project.use-case';
import {
  PublishProjectUseCase,
  UnpublishProjectUseCase,
} from '../../application/use-cases/publish-project.use-case';
import { ProjectNotFoundError } from '../../domain/errors/project-not-found.error';
import { Inject } from '@nestjs/common';
import {
  PROJECT_REPOSITORY,
  ProjectRepositoryPort,
} from '../../domain/ports/project.repository.port';

@ApiTags('Admin Projects')
@Controller('admin/projects')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class AdminProjectsController {
  constructor(
    private readonly createProject: CreateProjectUseCase,
    private readonly getAllProjects: GetAllProjectsUseCase,
    private readonly getProjectById: GetProjectByIdUseCase,
    private readonly updateProject: UpdateProjectUseCase,
    private readonly publishProject: PublishProjectUseCase,
    private readonly unpublishProject: UnpublishProjectUseCase,
    @Inject(PROJECT_REPOSITORY)
    private readonly projectRepository: ProjectRepositoryPort,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Listar todos los proyectos (admin)' })
  async findAll() {
    return this.getAllProjects.execute();
  }

  @Post()
  @ApiOperation({ summary: 'Crear proyecto' })
  async create(@Body() dto: CreateProjectDto) {
    return this.createProject.execute(dto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener proyecto por ID (admin)' })
  async findById(@Param('id', ParseUUIDPipe) id: string) {
    const project = await this.getProjectById.execute(id);
    if (!project) throw new NotFoundException('Proyecto no encontrado');
    return project;
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar proyecto' })
  async update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateProjectDto) {
    try {
      return await this.updateProject.execute(id, dto);
    } catch (error) {
      if (error instanceof ProjectNotFoundError) throw new NotFoundException(error.message);
      throw error;
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar proyecto' })
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.projectRepository.delete(id);
  }

  @Patch(':id/publish')
  @ApiOperation({ summary: 'Publicar proyecto' })
  async publish(@Param('id', ParseUUIDPipe) id: string) {
    try {
      return await this.publishProject.execute(id);
    } catch (error) {
      if (error instanceof ProjectNotFoundError) throw new NotFoundException(error.message);
      throw error;
    }
  }

  @Patch(':id/unpublish')
  @ApiOperation({ summary: 'Despublicar proyecto' })
  async unpublish(@Param('id', ParseUUIDPipe) id: string) {
    try {
      return await this.unpublishProject.execute(id);
    } catch (error) {
      if (error instanceof ProjectNotFoundError) throw new NotFoundException(error.message);
      throw error;
    }
  }
}

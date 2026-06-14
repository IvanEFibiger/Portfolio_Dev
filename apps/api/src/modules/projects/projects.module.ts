import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectOrmEntity } from './infrastructure/persistence/project.orm-entity';
import { ProjectTypeOrmRepository } from './infrastructure/persistence/project.typeorm.repository';
import { PROJECT_REPOSITORY } from './domain/ports/project.repository.port';
import { CreateProjectUseCase } from './application/use-cases/create-project.use-case';
import {
  GetPublicProjectsUseCase,
  GetAllProjectsUseCase,
  GetProjectByIdUseCase,
  GetProjectBySlugUseCase,
} from './application/use-cases/get-projects.use-case';
import { UpdateProjectUseCase } from './application/use-cases/update-project.use-case';
import {
  PublishProjectUseCase,
  UnpublishProjectUseCase,
} from './application/use-cases/publish-project.use-case';
import { PublicProjectsController } from './interfaces/http/public-projects.controller';
import { AdminProjectsController } from './interfaces/http/admin-projects.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectOrmEntity]), AuthModule],
  controllers: [PublicProjectsController, AdminProjectsController],
  providers: [
    {
      provide: PROJECT_REPOSITORY,
      useClass: ProjectTypeOrmRepository,
    },
    CreateProjectUseCase,
    GetPublicProjectsUseCase,
    GetAllProjectsUseCase,
    GetProjectByIdUseCase,
    GetProjectBySlugUseCase,
    UpdateProjectUseCase,
    PublishProjectUseCase,
    UnpublishProjectUseCase,
  ],
})
export class ProjectsModule {}

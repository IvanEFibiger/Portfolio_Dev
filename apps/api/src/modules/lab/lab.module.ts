import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { CreateLabUseCase } from './application/use-cases/create-lab.use-case';
import {
  GetAllLabsUseCase,
  GetLabByIdUseCase,
  GetLabBySlugUseCase,
  GetPublicLabsUseCase,
} from './application/use-cases/get-labs.use-case';
import {
  PublishLabUseCase,
  UnpublishLabUseCase,
} from './application/use-cases/publish-lab.use-case';
import { UpdateLabUseCase } from './application/use-cases/update-lab.use-case';
import { LAB_REPOSITORY } from './domain/ports/lab.repository.port';
import { LabOrmEntity } from './infrastructure/persistence/lab.orm-entity';
import { LabTypeOrmRepository } from './infrastructure/persistence/lab.typeorm.repository';
import { AdminLabController } from './interfaces/http/admin-lab.controller';
import { PublicLabController } from './interfaces/http/public-lab.controller';

@Module({
  imports: [TypeOrmModule.forFeature([LabOrmEntity]), AuthModule],
  controllers: [PublicLabController, AdminLabController],
  providers: [
    {
      provide: LAB_REPOSITORY,
      useClass: LabTypeOrmRepository,
    },
    CreateLabUseCase,
    GetPublicLabsUseCase,
    GetAllLabsUseCase,
    GetLabByIdUseCase,
    GetLabBySlugUseCase,
    UpdateLabUseCase,
    PublishLabUseCase,
    UnpublishLabUseCase,
  ],
})
export class LabModule {}

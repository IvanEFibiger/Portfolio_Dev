import { Inject, Injectable } from '@nestjs/common';
import { LabItem } from '../../domain/entities/lab.entity';
import { LAB_REPOSITORY, LabRepositoryPort } from '../../domain/ports/lab.repository.port';

@Injectable()
export class GetPublicLabsUseCase {
  constructor(
    @Inject(LAB_REPOSITORY)
    private readonly labRepository: LabRepositoryPort,
  ) {}

  async execute(): Promise<LabItem[]> {
    return this.labRepository.findAllPublished();
  }
}

@Injectable()
export class GetAllLabsUseCase {
  constructor(
    @Inject(LAB_REPOSITORY)
    private readonly labRepository: LabRepositoryPort,
  ) {}

  async execute(): Promise<LabItem[]> {
    return this.labRepository.findAll();
  }
}

@Injectable()
export class GetLabByIdUseCase {
  constructor(
    @Inject(LAB_REPOSITORY)
    private readonly labRepository: LabRepositoryPort,
  ) {}

  async execute(id: string): Promise<LabItem | null> {
    return this.labRepository.findById(id);
  }
}

@Injectable()
export class GetLabBySlugUseCase {
  constructor(
    @Inject(LAB_REPOSITORY)
    private readonly labRepository: LabRepositoryPort,
  ) {}

  async execute(slug: string): Promise<LabItem | null> {
    const lab = await this.labRepository.findBySlug(slug);
    if (!lab || !lab.isPublished()) return null;
    return lab;
  }
}

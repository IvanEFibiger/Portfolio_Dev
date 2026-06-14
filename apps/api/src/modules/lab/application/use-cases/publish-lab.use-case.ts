import { Inject, Injectable } from '@nestjs/common';
import { LabItem } from '../../domain/entities/lab.entity';
import { LabNotFoundError } from '../../domain/errors/lab-not-found.error';
import { LAB_REPOSITORY, LabRepositoryPort } from '../../domain/ports/lab.repository.port';

@Injectable()
export class PublishLabUseCase {
  constructor(
    @Inject(LAB_REPOSITORY)
    private readonly labRepository: LabRepositoryPort,
  ) {}

  async execute(id: string): Promise<LabItem> {
    const lab = await this.labRepository.findById(id);
    if (!lab) throw new LabNotFoundError(id);
    lab.publish();
    return this.labRepository.save(lab);
  }
}

@Injectable()
export class UnpublishLabUseCase {
  constructor(
    @Inject(LAB_REPOSITORY)
    private readonly labRepository: LabRepositoryPort,
  ) {}

  async execute(id: string): Promise<LabItem> {
    const lab = await this.labRepository.findById(id);
    if (!lab) throw new LabNotFoundError(id);
    lab.unpublish();
    return this.labRepository.save(lab);
  }
}

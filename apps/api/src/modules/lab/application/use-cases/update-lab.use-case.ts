import { Inject, Injectable } from '@nestjs/common';
import { UpdateLabDto } from '../dto/update-lab.dto';
import { LabItem } from '../../domain/entities/lab.entity';
import { LabNotFoundError } from '../../domain/errors/lab-not-found.error';
import { LAB_REPOSITORY, LabRepositoryPort } from '../../domain/ports/lab.repository.port';

@Injectable()
export class UpdateLabUseCase {
  constructor(
    @Inject(LAB_REPOSITORY)
    private readonly labRepository: LabRepositoryPort,
  ) {}

  async execute(id: string, dto: UpdateLabDto): Promise<LabItem> {
    const lab = await this.labRepository.findById(id);
    if (!lab) throw new LabNotFoundError(id);

    if (dto.labNumber !== undefined) lab.labNumber = dto.labNumber;
    if (dto.title !== undefined) lab.title = dto.title;
    if (dto.slug !== undefined) lab.slug = this.slugify(dto.slug);
    if (dto.description !== undefined) lab.description = dto.description;
    if (dto.status !== undefined) lab.status = dto.status as LabItem['status'];
    if (dto.stack !== undefined) lab.stack = dto.stack;
    if (dto.learning !== undefined) lab.learning = dto.learning;
    if (dto.sortOrder !== undefined) lab.sortOrder = dto.sortOrder;
    if (dto.published !== undefined) lab.published = dto.published;

    return this.labRepository.save(lab);
  }

  private slugify(value: string): string {
    return value
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  }
}

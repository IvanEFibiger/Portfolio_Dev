import { Inject, Injectable } from '@nestjs/common';
import { CreateLabDto } from '../dto/create-lab.dto';
import { LabItem } from '../../domain/entities/lab.entity';
import { LAB_REPOSITORY, LabRepositoryPort } from '../../domain/ports/lab.repository.port';

@Injectable()
export class CreateLabUseCase {
  constructor(
    @Inject(LAB_REPOSITORY)
    private readonly labRepository: LabRepositoryPort,
  ) {}

  async execute(dto: CreateLabDto): Promise<LabItem> {
    const baseSlug = dto.slug ? this.slugify(dto.slug) : this.slugify(dto.title);
    const existing = await this.labRepository.findBySlug(baseSlug);
    const finalSlug = existing ? `${baseSlug}-${Date.now()}` : baseSlug;

    return this.labRepository.create({
      labNumber: dto.labNumber,
      title: dto.title,
      slug: finalSlug,
      description: dto.description,
      status: (dto.status as LabItem['status']) ?? 'Explorando',
      stack: dto.stack,
      learning: dto.learning,
      sortOrder: dto.sortOrder ?? 0,
      published: dto.published ?? false,
    });
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

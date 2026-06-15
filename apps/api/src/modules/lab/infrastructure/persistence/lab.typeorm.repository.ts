import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LabItem } from '../../domain/entities/lab.entity';
import { CreateLabData, LabRepositoryPort } from '../../domain/ports/lab.repository.port';
import { LabMapper } from './lab.mapper';
import { LabOrmEntity } from './lab.orm-entity';

@Injectable()
export class LabTypeOrmRepository implements LabRepositoryPort {
  constructor(
    @InjectRepository(LabOrmEntity)
    private readonly repo: Repository<LabOrmEntity>,
  ) {}

  async findById(id: string): Promise<LabItem | null> {
    const entity = await this.repo.findOne({ where: { id } });
    return entity ? LabMapper.toDomain(entity) : null;
  }

  async findBySlug(slug: string): Promise<LabItem | null> {
    const entity = await this.repo.findOne({ where: { slug } });
    return entity ? LabMapper.toDomain(entity) : null;
  }

  async findAllPublished(): Promise<LabItem[]> {
    const entities = await this.repo.find({
      where: { published: true },
      order: { sortOrder: 'ASC' },
    });
    return entities.map(LabMapper.toDomain);
  }

  async findAll(): Promise<LabItem[]> {
    const entities = await this.repo.find({ order: { sortOrder: 'ASC' } });
    return entities.map(LabMapper.toDomain);
  }

  async save(lab: LabItem): Promise<LabItem> {
    const saved = await this.repo.save(LabMapper.toOrm(lab));
    const full = await this.repo.findOneOrFail({ where: { id: saved.id } });
    return LabMapper.toDomain(full);
  }

  async create(data: CreateLabData): Promise<LabItem> {
    const saved = await this.repo.save(this.repo.create(data));
    return LabMapper.toDomain(saved);
  }

  async delete(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}

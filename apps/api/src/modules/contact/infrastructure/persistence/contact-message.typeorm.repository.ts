import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContactMessage } from '../../domain/entities/contact-message.entity';
import {
  ContactMessageRepositoryPort,
  CreateContactMessageData,
} from '../../domain/ports/contact-message.repository.port';
import { ContactMessageOrmEntity } from './contact-message.orm-entity';
import { ContactMessageMapper } from './contact-message.mapper';

@Injectable()
export class ContactMessageTypeOrmRepository implements ContactMessageRepositoryPort {
  constructor(
    @InjectRepository(ContactMessageOrmEntity)
    private readonly repo: Repository<ContactMessageOrmEntity>,
  ) {}

  async findAll(): Promise<ContactMessage[]> {
    const entities = await this.repo.find({ order: { createdAt: 'DESC' } });
    return entities.map(ContactMessageMapper.toDomain);
  }

  async findById(id: string): Promise<ContactMessage | null> {
    const entity = await this.repo.findOne({ where: { id } });
    return entity ? ContactMessageMapper.toDomain(entity) : null;
  }

  async create(data: CreateContactMessageData): Promise<ContactMessage> {
    const entity = this.repo.create({
      name: data.name,
      email: data.email,
      company: data.company ?? undefined,
      subject: data.subject ?? undefined,
      message: data.message,
      status: data.status,
      source: data.source ?? undefined,
    });
    const saved = await this.repo.save(entity);
    return ContactMessageMapper.toDomain(saved);
  }

  async save(contactMessage: ContactMessage): Promise<ContactMessage> {
    const ormData = ContactMessageMapper.toOrm(contactMessage);
    const saved = await this.repo.save(ormData);
    const full = await this.repo.findOneOrFail({ where: { id: saved.id } });
    return ContactMessageMapper.toDomain(full);
  }
}

import { Inject, Injectable } from '@nestjs/common';
import {
  CONTACT_MESSAGE_REPOSITORY,
  ContactMessageRepositoryPort,
} from '../../domain/ports/contact-message.repository.port';
import { CreateContactMessageDto } from '../dto/create-contact-message.dto';
import { ContactMessage } from '../../domain/entities/contact-message.entity';

@Injectable()
export class CreateContactMessageUseCase {
  constructor(
    @Inject(CONTACT_MESSAGE_REPOSITORY)
    private readonly contactMessageRepository: ContactMessageRepositoryPort,
  ) {}

  async execute(dto: CreateContactMessageDto): Promise<ContactMessage> {
    return this.contactMessageRepository.create({
      name: dto.name,
      email: dto.email,
      company: dto.company ?? null,
      subject: dto.subject ?? null,
      message: dto.message,
      status: 'new',
      source: null,
    });
  }
}

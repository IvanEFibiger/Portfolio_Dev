import { Inject, Injectable } from '@nestjs/common';
import {
  CONTACT_MESSAGE_REPOSITORY,
  ContactMessageRepositoryPort,
} from '../../domain/ports/contact-message.repository.port';
import { ContactMessage } from '../../domain/entities/contact-message.entity';

@Injectable()
export class GetAllContactMessagesUseCase {
  constructor(
    @Inject(CONTACT_MESSAGE_REPOSITORY)
    private readonly contactMessageRepository: ContactMessageRepositoryPort,
  ) {}

  async execute(): Promise<ContactMessage[]> {
    return this.contactMessageRepository.findAll();
  }
}

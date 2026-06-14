import { Inject, Injectable } from '@nestjs/common';
import {
  CONTACT_MESSAGE_REPOSITORY,
  ContactMessageRepositoryPort,
} from '../../domain/ports/contact-message.repository.port';
import { UpdateContactStatusDto } from '../dto/update-contact-status.dto';
import { ContactMessage } from '../../domain/entities/contact-message.entity';
import { ContactMessageNotFoundError } from '../../domain/errors/contact-message-not-found.error';

@Injectable()
export class UpdateContactStatusUseCase {
  constructor(
    @Inject(CONTACT_MESSAGE_REPOSITORY)
    private readonly contactMessageRepository: ContactMessageRepositoryPort,
  ) {}

  async execute(id: string, dto: UpdateContactStatusDto): Promise<ContactMessage> {
    const contactMessage = await this.contactMessageRepository.findById(id);
    if (!contactMessage) throw new ContactMessageNotFoundError(id);

    switch (dto.status) {
      case 'read':
        contactMessage.markAsRead();
        break;
      case 'answered':
        contactMessage.markAsAnswered();
        break;
      case 'discarded':
        contactMessage.discard();
        break;
    }

    return this.contactMessageRepository.save(contactMessage);
  }
}

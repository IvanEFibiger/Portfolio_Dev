import { ContactMessage, ContactMessageStatus } from '../entities/contact-message.entity';

export interface CreateContactMessageData {
  name: string;
  email: string;
  company: string | null;
  subject: string | null;
  message: string;
  status: ContactMessageStatus;
  source: string | null;
}

export interface ContactMessageRepositoryPort {
  findAll(): Promise<ContactMessage[]>;
  findById(id: string): Promise<ContactMessage | null>;
  create(data: CreateContactMessageData): Promise<ContactMessage>;
  save(contactMessage: ContactMessage): Promise<ContactMessage>;
}

export const CONTACT_MESSAGE_REPOSITORY = Symbol('CONTACT_MESSAGE_REPOSITORY');

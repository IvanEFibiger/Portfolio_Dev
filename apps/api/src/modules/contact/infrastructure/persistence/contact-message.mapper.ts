import { ContactMessage, ContactMessageStatus } from '../../domain/entities/contact-message.entity';
import { ContactMessageOrmEntity } from './contact-message.orm-entity';

export class ContactMessageMapper {
  static toDomain(orm: ContactMessageOrmEntity): ContactMessage {
    return new ContactMessage(
      orm.id,
      orm.name,
      orm.email,
      orm.company ?? null,
      orm.subject ?? null,
      orm.message,
      orm.status as ContactMessageStatus,
      orm.source ?? null,
      orm.createdAt,
      orm.updatedAt,
    );
  }

  static toOrm(domain: ContactMessage): Partial<ContactMessageOrmEntity> {
    return {
      id: domain.id,
      name: domain.name,
      email: domain.email,
      company: domain.company ?? undefined,
      subject: domain.subject ?? undefined,
      message: domain.message,
      status: domain.status,
      source: domain.source ?? undefined,
    };
  }
}

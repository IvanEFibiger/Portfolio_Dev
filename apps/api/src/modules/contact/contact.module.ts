import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactMessageOrmEntity } from './infrastructure/persistence/contact-message.orm-entity';
import { ContactMessageTypeOrmRepository } from './infrastructure/persistence/contact-message.typeorm.repository';
import { CONTACT_MESSAGE_REPOSITORY } from './domain/ports/contact-message.repository.port';
import { CreateContactMessageUseCase } from './application/use-cases/create-contact-message.use-case';
import { GetAllContactMessagesUseCase } from './application/use-cases/get-contact-messages.use-case';
import { UpdateContactStatusUseCase } from './application/use-cases/update-contact-status.use-case';
import { PublicContactController } from './interfaces/http/public-contact.controller';
import { AdminContactController } from './interfaces/http/admin-contact.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([ContactMessageOrmEntity]), AuthModule],
  controllers: [PublicContactController, AdminContactController],
  providers: [
    {
      provide: CONTACT_MESSAGE_REPOSITORY,
      useClass: ContactMessageTypeOrmRepository,
    },
    CreateContactMessageUseCase,
    GetAllContactMessagesUseCase,
    UpdateContactStatusUseCase,
  ],
})
export class ContactModule {}

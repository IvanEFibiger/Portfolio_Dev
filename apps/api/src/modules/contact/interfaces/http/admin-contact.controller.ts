import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@common/guards/jwt-auth.guard';
import { GetAllContactMessagesUseCase } from '../../application/use-cases/get-contact-messages.use-case';
import { UpdateContactStatusUseCase } from '../../application/use-cases/update-contact-status.use-case';
import { UpdateContactStatusDto } from '../../application/dto/update-contact-status.dto';
import { ContactMessageNotFoundError } from '../../domain/errors/contact-message-not-found.error';

@ApiTags('Admin Contact Messages')
@Controller('admin/contact-messages')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class AdminContactController {
  constructor(
    private readonly getAllContactMessages: GetAllContactMessagesUseCase,
    private readonly updateContactStatus: UpdateContactStatusUseCase,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Listar todos los mensajes de contacto (admin)' })
  async findAll() {
    return this.getAllContactMessages.execute();
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Actualizar estado de mensaje de contacto' })
  async changeStatus(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateContactStatusDto) {
    try {
      return await this.updateContactStatus.execute(id, dto);
    } catch (error) {
      if (error instanceof ContactMessageNotFoundError) throw new NotFoundException(error.message);
      throw error;
    }
  }
}

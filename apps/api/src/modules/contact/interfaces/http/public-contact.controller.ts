import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { CreateContactMessageDto } from '../../application/dto/create-contact-message.dto';
import { CreateContactMessageUseCase } from '../../application/use-cases/create-contact-message.use-case';

@ApiTags('Contact')
@Controller('contact')
export class PublicContactController {
  constructor(private readonly createContactMessage: CreateContactMessageUseCase) {}

  @Post()
  @Throttle({ default: { limit: 3, ttl: 60000 } })
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Enviar mensaje de contacto' })
  @ApiResponse({ status: 201, description: 'Mensaje enviado correctamente' })
  @ApiResponse({ status: 429, description: 'Demasiados intentos, intente más tarde' })
  async create(@Body() dto: CreateContactMessageDto) {
    await this.createContactMessage.execute(dto);
    return { message: 'Mensaje enviado correctamente' };
  }
}

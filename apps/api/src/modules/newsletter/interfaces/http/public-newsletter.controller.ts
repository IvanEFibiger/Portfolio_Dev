import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { SubscribeNewsletterDto } from '../../application/dto/subscribe-newsletter.dto';
import { SubscribeNewsletterUseCase } from '../../application/use-cases/subscribe-newsletter.use-case';

@ApiTags('Newsletter')
@Controller('newsletter')
export class PublicNewsletterController {
  constructor(private readonly subscribeNewsletter: SubscribeNewsletterUseCase) {}

  @Post('subscribe')
  @HttpCode(HttpStatus.CREATED)
  @Throttle({ default: { limit: 3, ttl: 60000 } })
  @ApiOperation({ summary: 'Suscribirse al newsletter' })
  @ApiResponse({ status: 201, description: 'Suscripción registrada correctamente' })
  @ApiResponse({ status: 409, description: 'El correo electrónico ya está suscrito' })
  @ApiResponse({ status: 429, description: 'Demasiadas solicitudes, intente más tarde' })
  async subscribe(@Body() dto: SubscribeNewsletterDto) {
    const subscriber = await this.subscribeNewsletter.execute(dto);
    return {
      message: 'Suscripción registrada correctamente',
      email: subscriber.email,
      status: subscriber.status,
    };
  }
}

import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@common/guards/jwt-auth.guard';
import { GetSubscribersUseCase } from '../../application/use-cases/get-subscribers.use-case';

@ApiTags('Admin Newsletter')
@Controller('admin/newsletter')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class AdminNewsletterController {
  constructor(private readonly getSubscribers: GetSubscribersUseCase) {}

  @Get('subscribers')
  @ApiOperation({ summary: 'Listar todos los suscriptores del newsletter (admin)' })
  async findAll() {
    return this.getSubscribers.execute();
  }
}

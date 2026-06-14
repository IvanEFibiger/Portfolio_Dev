import { Body, Controller, Headers, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SkipThrottle, Throttle } from '@nestjs/throttler';
import { CreatePageViewDto } from '../../application/dto/create-page-view.dto';
import { RecordPageViewUseCase } from '../../application/use-cases/record-page-view.use-case';

@ApiTags('Analytics')
@Controller('analytics')
@SkipThrottle()
export class PublicAnalyticsController {
  constructor(private readonly recordPageView: RecordPageViewUseCase) {}

  @Post('page-view')
  @HttpCode(HttpStatus.CREATED)
  @Throttle({ default: { limit: 30, ttl: 60000 } })
  @ApiOperation({ summary: 'Registrar page view' })
  @ApiResponse({ status: 201, description: 'Evento registrado' })
  async create(@Body() dto: CreatePageViewDto, @Headers('user-agent') userAgent?: string) {
    await this.recordPageView.execute(dto, userAgent);
    return { message: 'Evento registrado' };
  }
}

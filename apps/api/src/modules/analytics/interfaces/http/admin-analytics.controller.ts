import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@common/guards/jwt-auth.guard';
import { AnalyticsSummaryQueryDto } from '../../application/dto/analytics-summary-query.dto';
import { GetAnalyticsSummaryUseCase } from '../../application/use-cases/get-analytics-summary.use-case';

@ApiTags('Admin Analytics')
@Controller('admin/analytics')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class AdminAnalyticsController {
  constructor(private readonly getAnalyticsSummary: GetAnalyticsSummaryUseCase) {}

  @Get('summary')
  @ApiOperation({ summary: 'Resumen de analytics' })
  async summary(@Query() query: AnalyticsSummaryQueryDto) {
    return this.getAnalyticsSummary.execute(query);
  }
}

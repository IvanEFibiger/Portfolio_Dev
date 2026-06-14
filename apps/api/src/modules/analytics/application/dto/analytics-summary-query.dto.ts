import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsOptional } from 'class-validator';

export class AnalyticsSummaryQueryDto {
  @ApiPropertyOptional({ example: '2026-05-01T00:00:00.000Z' })
  @IsDateString()
  @IsOptional()
  from?: string;

  @ApiPropertyOptional({ example: '2026-05-31T23:59:59.999Z' })
  @IsDateString()
  @IsOptional()
  to?: string;
}

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class CreatePageViewDto {
  @ApiProperty({ example: '/projects/mi-patagones' })
  @IsString()
  @MaxLength(500)
  path!: string;

  @ApiPropertyOptional({ example: 'https://google.com' })
  @IsString()
  @IsOptional()
  @MaxLength(500)
  referrer?: string;
}

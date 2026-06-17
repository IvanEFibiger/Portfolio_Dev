import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString, MaxLength } from 'class-validator';

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

  // El navegador del dueño del sitio manda esto en true (flag local) para que
  // sus propias visitas se marquen y no cuenten como visitantes ajenos.
  @ApiPropertyOptional({ example: false })
  @IsBoolean()
  @IsOptional()
  isOwner?: boolean;
}

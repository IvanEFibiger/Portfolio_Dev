import { IsString, IsNotEmpty, IsOptional, IsObject, IsIn, IsArray, IsInt } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateArticleDto {
  @ApiProperty({ example: 'Diseñando autorización granular' })
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiPropertyOptional({
    example: 'disenando-autorizacion-granular',
    description: 'Slug opcional; se genera desde el título si no se envía',
  })
  @IsString()
  @IsOptional()
  slug?: string;

  @ApiProperty({ example: 'Resumen del artículo...' })
  @IsString()
  @IsNotEmpty()
  excerpt!: string;

  @ApiProperty({ example: { blocks: [] }, description: 'Contenido estructurado en formato JSON' })
  @IsObject()
  @IsNotEmpty()
  content!: Record<string, unknown>;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  coverImageUrl?: string;

  @ApiPropertyOptional({ enum: ['public', 'private'], default: 'public' })
  @IsString()
  @IsOptional()
  @IsIn(['public', 'private'])
  visibility?: string;

  @ApiPropertyOptional({ enum: ['draft', 'published', 'archived'] })
  @IsString()
  @IsOptional()
  @IsIn(['draft', 'published', 'archived'])
  status?: string;

  @ApiPropertyOptional()
  @IsInt()
  @IsOptional()
  readingTimeMinutes?: number;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  seoTitle?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  seoDescription?: string;

  @ApiPropertyOptional({ example: 'Arquitectura' })
  @IsString()
  @IsOptional()
  category?: string;

  @ApiPropertyOptional({ example: ['NestJS', 'Seguridad'], type: [String] })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: string[];
}

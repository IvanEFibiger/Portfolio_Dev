import { IsString, IsNotEmpty, IsOptional, IsArray, IsBoolean, IsInt, IsIn } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProjectDto {
  @ApiProperty({ example: 'Portfolio Personal' })
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiPropertyOptional({
    example: 'portfolio-personal',
    description: 'Slug opcional; se genera desde el título si no se envía',
  })
  @IsString()
  @IsOptional()
  slug?: string;

  @ApiProperty({ example: 'Resumen breve del proyecto...' })
  @IsString()
  @IsNotEmpty()
  summary!: string;

  @ApiPropertyOptional({ example: 'Descripción detallada del proyecto...' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ example: 'Problema que resuelve...' })
  @IsString()
  @IsOptional()
  problem?: string;

  @ApiPropertyOptional({ example: 'Solución implementada...' })
  @IsString()
  @IsOptional()
  solution?: string;

  @ApiPropertyOptional({ example: 'Arquitectura del sistema...' })
  @IsString()
  @IsOptional()
  architecture?: string;

  @ApiProperty({ example: ['NestJS', 'React', 'PostgreSQL'], type: [String] })
  @IsArray()
  @IsString({ each: true })
  stack!: string[];

  @ApiPropertyOptional({ enum: ['draft', 'published', 'archived'] })
  @IsString()
  @IsOptional()
  @IsIn(['draft', 'published', 'archived'])
  status?: string;

  @ApiPropertyOptional({ default: false })
  @IsBoolean()
  @IsOptional()
  featured?: boolean;

  @ApiPropertyOptional({ example: 'https://github.com/user/repo' })
  @IsString()
  @IsOptional()
  repositoryUrl?: string;

  @ApiPropertyOptional({ example: 'https://demo.example.com' })
  @IsString()
  @IsOptional()
  demoUrl?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  coverImageUrl?: string;

  @ApiPropertyOptional({ example: 0 })
  @IsInt()
  @IsOptional()
  sortOrder?: number;

  @ApiPropertyOptional({ example: 'Plataforma municipal' })
  @IsString()
  @IsOptional()
  type?: string;

  @ApiPropertyOptional({ enum: ['active', 'dev', 'wip'] })
  @IsString()
  @IsOptional()
  @IsIn(['active', 'dev', 'wip'])
  operationalStatus?: string;

  @ApiPropertyOptional({ example: 'Alta' })
  @IsString()
  @IsOptional()
  complexity?: string;

  @ApiPropertyOptional({ example: 'Contexto del proyecto...' })
  @IsString()
  @IsOptional()
  context?: string;

  @ApiPropertyOptional({ example: 'Objetivo del proyecto...' })
  @IsString()
  @IsOptional()
  objective?: string;

  @ApiPropertyOptional({ example: ['Restricción 1', 'Restricción 2'], type: [String] })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  restrictions?: string[];

  @ApiPropertyOptional({ example: ['Decisión 1'], type: [String] })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  technicalDecisions?: string[];

  @ApiPropertyOptional({ example: ['Medida 1'], type: [String] })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  security?: string[];

  @ApiPropertyOptional({ example: 'Resultado alcanzado...' })
  @IsString()
  @IsOptional()
  result?: string;

  @ApiPropertyOptional({ example: 'Aprendizajes...' })
  @IsString()
  @IsOptional()
  learnings?: string;

  @ApiPropertyOptional({ example: 'Mejoras futuras...' })
  @IsString()
  @IsOptional()
  improvements?: string;

  @ApiPropertyOptional({ example: ['Highlight 1'], type: [String] })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  highlights?: string[];

  @ApiPropertyOptional({ example: 'Rol en el proyecto...' })
  @IsString()
  @IsOptional()
  role?: string;
}

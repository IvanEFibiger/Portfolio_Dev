import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsIn, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateLabDto {
  @ApiProperty({ example: 'LAB-001' })
  @IsString()
  @IsNotEmpty()
  labNumber!: string;

  @ApiProperty({ example: 'RAG local con Ollama y pgvector' })
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiPropertyOptional({ example: 'rag-local-ollama-pgvector' })
  @IsString()
  @IsOptional()
  slug?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description!: string;

  @ApiPropertyOptional({ enum: ['Explorando', 'En desarrollo', 'Documentado', 'Archivado'] })
  @IsString()
  @IsOptional()
  @IsIn(['Explorando', 'En desarrollo', 'Documentado', 'Archivado'])
  status?: string;

  @ApiProperty({ example: ['Ollama', 'pgvector', 'PostgreSQL'], type: [String] })
  @IsArray()
  @IsString({ each: true })
  stack!: string[];

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  learning!: string;

  @ApiPropertyOptional({ example: 1 })
  @IsInt()
  @IsOptional()
  sortOrder?: number;
}

import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SkipThrottle } from '@nestjs/throttler';
import {
  GetLabBySlugUseCase,
  GetPublicLabsUseCase,
} from '../../application/use-cases/get-labs.use-case';

@ApiTags('Public Lab')
@Controller('public/lab')
@SkipThrottle()
export class PublicLabController {
  constructor(
    private readonly getPublicLabs: GetPublicLabsUseCase,
    private readonly getLabBySlug: GetLabBySlugUseCase,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Listar items publicados del laboratorio' })
  async findAll() {
    return this.getPublicLabs.execute();
  }

  @Get(':slug')
  @ApiOperation({ summary: 'Obtener item publicado del laboratorio por slug' })
  async findBySlug(@Param('slug') slug: string) {
    const lab = await this.getLabBySlug.execute(slug);
    if (!lab) throw new NotFoundException('Lab no encontrado');
    return lab;
  }
}

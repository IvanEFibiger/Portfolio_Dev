import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@common/guards/jwt-auth.guard';
import { CreateLabDto } from '../../application/dto/create-lab.dto';
import { UpdateLabDto } from '../../application/dto/update-lab.dto';
import { CreateLabUseCase } from '../../application/use-cases/create-lab.use-case';
import {
  GetAllLabsUseCase,
  GetLabByIdUseCase,
} from '../../application/use-cases/get-labs.use-case';
import {
  PublishLabUseCase,
  UnpublishLabUseCase,
} from '../../application/use-cases/publish-lab.use-case';
import { UpdateLabUseCase } from '../../application/use-cases/update-lab.use-case';
import { LabNotFoundError } from '../../domain/errors/lab-not-found.error';
import { LAB_REPOSITORY, LabRepositoryPort } from '../../domain/ports/lab.repository.port';

@ApiTags('Admin Lab')
@Controller('admin/lab')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class AdminLabController {
  constructor(
    private readonly createLab: CreateLabUseCase,
    private readonly getAllLabs: GetAllLabsUseCase,
    private readonly getLabById: GetLabByIdUseCase,
    private readonly updateLab: UpdateLabUseCase,
    private readonly publishLab: PublishLabUseCase,
    private readonly unpublishLab: UnpublishLabUseCase,
    @Inject(LAB_REPOSITORY)
    private readonly labRepository: LabRepositoryPort,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Listar laboratorio (admin)' })
  async findAll() {
    return this.getAllLabs.execute();
  }

  @Post()
  @ApiOperation({ summary: 'Crear item de laboratorio' })
  async create(@Body() dto: CreateLabDto) {
    return this.createLab.execute(dto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener item de laboratorio por ID' })
  async findById(@Param('id', ParseUUIDPipe) id: string) {
    const lab = await this.getLabById.execute(id);
    if (!lab) throw new NotFoundException('Lab no encontrado');
    return lab;
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar item de laboratorio' })
  async update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateLabDto) {
    try {
      return await this.updateLab.execute(id, dto);
    } catch (error) {
      if (error instanceof LabNotFoundError) throw new NotFoundException(error.message);
      throw error;
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar item de laboratorio' })
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.labRepository.delete(id);
  }

  @Patch(':id/publish')
  @ApiOperation({ summary: 'Marcar item como documentado' })
  async publish(@Param('id', ParseUUIDPipe) id: string) {
    try {
      return await this.publishLab.execute(id);
    } catch (error) {
      if (error instanceof LabNotFoundError) throw new NotFoundException(error.message);
      throw error;
    }
  }

  @Patch(':id/unpublish')
  @ApiOperation({ summary: 'Marcar item como explorando' })
  async unpublish(@Param('id', ParseUUIDPipe) id: string) {
    try {
      return await this.unpublishLab.execute(id);
    } catch (error) {
      if (error instanceof LabNotFoundError) throw new NotFoundException(error.message);
      throw error;
    }
  }
}

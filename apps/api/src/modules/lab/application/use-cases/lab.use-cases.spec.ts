import {
  GetAllLabsUseCase,
  GetLabByIdUseCase,
  GetLabBySlugUseCase,
  GetPublicLabsUseCase,
} from './get-labs.use-case';
import { CreateLabUseCase } from './create-lab.use-case';
import { UpdateLabUseCase } from './update-lab.use-case';
import { PublishLabUseCase, UnpublishLabUseCase } from './publish-lab.use-case';
import { LabItem } from '../../domain/entities/lab.entity';
import { LabNotFoundError } from '../../domain/errors/lab-not-found.error';
import { LabRepositoryPort } from '../../domain/ports/lab.repository.port';

type LabOverrides = Partial<Omit<LabItem, 'publish' | 'unpublish' | 'archive' | 'isPublished'>>;

function createLab(overrides: LabOverrides = {}): LabItem {
  const now = new Date();
  return new LabItem(
    overrides.id ?? 'lab-1',
    overrides.labNumber ?? 'LAB-001',
    overrides.title ?? 'RAG local con Ollama',
    overrides.slug ?? 'rag-local-ollama',
    overrides.description ?? 'Recuperación semántica local',
    overrides.status ?? 'Documentado',
    overrides.stack ?? ['Ollama', 'pgvector'],
    overrides.learning ?? 'Aprendizaje del lab',
    overrides.sortOrder ?? 1,
    overrides.published ?? true,
    overrides.createdAt ?? now,
    overrides.updatedAt ?? now,
  );
}

describe('GetLabBySlugUseCase', () => {
  it('devuelve el lab si está publicado', async () => {
    const lab = createLab({ status: 'Documentado' });
    const repo = {
      findBySlug: jest.fn().mockResolvedValue(lab),
    } as unknown as LabRepositoryPort;

    const useCase = new GetLabBySlugUseCase(repo);
    const result = await useCase.execute('rag-local-ollama');

    expect(repo.findBySlug).toHaveBeenCalledWith('rag-local-ollama');
    expect(result).toBe(lab);
  });

  it('devuelve null si no existe', async () => {
    const repo = {
      findBySlug: jest.fn().mockResolvedValue(null),
    } as unknown as LabRepositoryPort;

    const useCase = new GetLabBySlugUseCase(repo);
    const result = await useCase.execute('no-existe');

    expect(result).toBeNull();
  });

  it('devuelve null si existe pero no está publicado', async () => {
    const lab = createLab({ status: 'Archivado', published: false });
    const repo = {
      findBySlug: jest.fn().mockResolvedValue(lab),
    } as unknown as LabRepositoryPort;

    const useCase = new GetLabBySlugUseCase(repo);
    const result = await useCase.execute('rag-local-ollama');

    expect(result).toBeNull();
  });
});

describe('GetPublicLabsUseCase', () => {
  it('delega en findAllPublished', async () => {
    const labs = [createLab({ id: 'lab-1' }), createLab({ id: 'lab-2' })];
    const repo = {
      findAllPublished: jest.fn().mockResolvedValue(labs),
    } as unknown as LabRepositoryPort;

    const useCase = new GetPublicLabsUseCase(repo);
    const result = await useCase.execute();

    expect(repo.findAllPublished).toHaveBeenCalled();
    expect(result).toBe(labs);
  });
});

describe('GetAllLabsUseCase', () => {
  it('delega en findAll', async () => {
    const labs = [createLab({ id: 'lab-1' }), createLab({ id: 'lab-2' })];
    const repo = {
      findAll: jest.fn().mockResolvedValue(labs),
    } as unknown as LabRepositoryPort;

    const useCase = new GetAllLabsUseCase(repo);
    const result = await useCase.execute();

    expect(repo.findAll).toHaveBeenCalled();
    expect(result).toBe(labs);
  });
});

describe('GetLabByIdUseCase', () => {
  it('delega en findById', async () => {
    const lab = createLab({ id: 'lab-1' });
    const repo = {
      findById: jest.fn().mockResolvedValue(lab),
    } as unknown as LabRepositoryPort;

    const useCase = new GetLabByIdUseCase(repo);
    const result = await useCase.execute('lab-1');

    expect(repo.findById).toHaveBeenCalledWith('lab-1');
    expect(result).toBe(lab);
  });
});

describe('PublishLabUseCase', () => {
  it('publica el lab y lo guarda', async () => {
    const lab = createLab({ status: 'Explorando' });
    const savedLab = createLab({ status: 'Explorando', published: true });
    const repo = {
      findById: jest.fn().mockResolvedValue(lab),
      save: jest.fn().mockResolvedValue(savedLab),
    } as unknown as LabRepositoryPort;

    const useCase = new PublishLabUseCase(repo);
    const result = await useCase.execute('lab-1');

    expect(repo.findById).toHaveBeenCalledWith('lab-1');
    expect(lab.status).toBe('Explorando');
    expect(lab.published).toBe(true);
    expect(repo.save).toHaveBeenCalledWith(lab);
    expect(result).toBe(savedLab);
  });

  it('lanza LabNotFoundError si no existe', async () => {
    const repo = {
      findById: jest.fn().mockResolvedValue(null),
    } as unknown as LabRepositoryPort;

    const useCase = new PublishLabUseCase(repo);

    await expect(useCase.execute('no-existe')).rejects.toThrow(LabNotFoundError);
    expect(repo.findById).toHaveBeenCalledWith('no-existe');
  });
});

describe('UnpublishLabUseCase', () => {
  it('despublica el lab y lo guarda', async () => {
    const lab = createLab({ status: 'Documentado' });
    const savedLab = createLab({ status: 'Documentado', published: false });
    const repo = {
      findById: jest.fn().mockResolvedValue(lab),
      save: jest.fn().mockResolvedValue(savedLab),
    } as unknown as LabRepositoryPort;

    const useCase = new UnpublishLabUseCase(repo);
    const result = await useCase.execute('lab-1');

    expect(repo.findById).toHaveBeenCalledWith('lab-1');
    expect(lab.status).toBe('Documentado');
    expect(lab.published).toBe(false);
    expect(repo.save).toHaveBeenCalledWith(lab);
    expect(result).toBe(savedLab);
  });

  it('lanza LabNotFoundError si no existe', async () => {
    const repo = {
      findById: jest.fn().mockResolvedValue(null),
    } as unknown as LabRepositoryPort;

    const useCase = new UnpublishLabUseCase(repo);

    await expect(useCase.execute('no-existe')).rejects.toThrow(LabNotFoundError);
    expect(repo.findById).toHaveBeenCalledWith('no-existe');
  });
});

describe('CreateLabUseCase', () => {
  it('crea un lab con los datos proporcionados', async () => {
    const createdLab = createLab({ slug: 'mi-lab' });
    const repo = {
      findBySlug: jest.fn().mockResolvedValue(null),
      create: jest.fn().mockResolvedValue(createdLab),
    } as unknown as LabRepositoryPort;

    const useCase = new CreateLabUseCase(repo);
    const dto = {
      labNumber: 'LAB-002',
      title: 'Mi Lab',
      slug: 'mi-lab',
      description: 'Descripción',
      status: 'Explorando' as const,
      stack: ['Node'],
      learning: 'Aprendizaje',
      sortOrder: 2,
    };
    const result = await useCase.execute(dto);

    expect(repo.findBySlug).toHaveBeenCalledWith('mi-lab');
    expect(repo.create).toHaveBeenCalledWith(
      expect.objectContaining({
        labNumber: 'LAB-002',
        title: 'Mi Lab',
        slug: 'mi-lab',
        description: 'Descripción',
        status: 'Explorando',
        stack: ['Node'],
        learning: 'Aprendizaje',
        sortOrder: 2,
        published: false,
      }),
    );
    expect(result).toBe(createdLab);
  });

  it('genera el slug a partir del título si no se proporciona', async () => {
    const createdLab = createLab({ slug: 'mi-lab-desde-titulo' });
    const repo = {
      findBySlug: jest.fn().mockResolvedValue(null),
      create: jest.fn().mockResolvedValue(createdLab),
    } as unknown as LabRepositoryPort;

    const useCase = new CreateLabUseCase(repo);
    const dto = {
      labNumber: 'LAB-003',
      title: 'Mi Lab Desde Título',
      description: 'Descripción',
      stack: ['Node'],
      learning: 'Aprendizaje',
    };
    await useCase.execute(dto);

    expect(repo.create).toHaveBeenCalledWith(
      expect.objectContaining({
        slug: 'mi-lab-desde-titulo',
      }),
    );
  });

  it('agrega sufijo al slug si ya existe', async () => {
    const existingLab = createLab({ slug: 'lab-existente' });
    const createdLab = createLab({ slug: 'lab-existente-1234567890123' });
    const repo = {
      findBySlug: jest.fn().mockResolvedValue(existingLab),
      create: jest.fn().mockResolvedValue(createdLab),
    } as unknown as LabRepositoryPort;

    const useCase = new CreateLabUseCase(repo);
    const dto = {
      labNumber: 'LAB-004',
      title: 'Lab Existente',
      slug: 'lab-existente',
      description: 'Descripción',
      stack: ['Node'],
      learning: 'Aprendizaje',
    };
    await useCase.execute(dto);

    expect(repo.create).toHaveBeenCalledWith(
      expect.objectContaining({
        slug: expect.stringMatching(/^lab-existente-\d+$/),
      }),
    );
  });
});

describe('UpdateLabUseCase', () => {
  it('actualiza los campos proporcionados y guarda', async () => {
    const lab = createLab({ id: 'lab-1', title: 'Título original' });
    const savedLab = createLab({ id: 'lab-1', title: 'Título actualizado' });
    const repo = {
      findById: jest.fn().mockResolvedValue(lab),
      save: jest.fn().mockResolvedValue(savedLab),
    } as unknown as LabRepositoryPort;

    const useCase = new UpdateLabUseCase(repo);
    const result = await useCase.execute('lab-1', { title: 'Título actualizado' });

    expect(repo.findById).toHaveBeenCalledWith('lab-1');
    expect(lab.title).toBe('Título actualizado');
    expect(repo.save).toHaveBeenCalledWith(lab);
    expect(result).toBe(savedLab);
  });

  it('slugifica el slug si se proporciona', async () => {
    const lab = createLab({ id: 'lab-1', slug: 'slug-original' });
    const repo = {
      findById: jest.fn().mockResolvedValue(lab),
      save: jest.fn().mockResolvedValue(lab),
    } as unknown as LabRepositoryPort;

    const useCase = new UpdateLabUseCase(repo);
    await useCase.execute('lab-1', { slug: 'Nuevo Slug' });

    expect(lab.slug).toBe('nuevo-slug');
  });

  it('lanza LabNotFoundError si no existe', async () => {
    const repo = {
      findById: jest.fn().mockResolvedValue(null),
    } as unknown as LabRepositoryPort;

    const useCase = new UpdateLabUseCase(repo);

    await expect(useCase.execute('no-existe', { title: 'Nuevo' })).rejects.toThrow(
      LabNotFoundError,
    );
    expect(repo.findById).toHaveBeenCalledWith('no-existe');
  });
});

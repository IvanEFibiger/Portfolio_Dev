import { GetProjectBySlugUseCase, GetPublicProjectsUseCase } from './get-projects.use-case';
import { Project } from '../../domain/entities/project.entity';
import { ProjectRepositoryPort } from '../../domain/ports/project.repository.port';

type ProjectOverrides = Partial<Omit<Project, 'publish' | 'unpublish' | 'archive' | 'isPublished'>>;

function createProject(overrides: ProjectOverrides = {}): Project {
  const now = new Date();
  return new Project(
    overrides.id ?? 'project-1',
    overrides.title ?? 'Título del proyecto',
    overrides.slug ?? 'titulo-del-proyecto',
    overrides.summary ?? 'Resumen del proyecto',
    overrides.description ?? null,
    overrides.problem ?? null,
    overrides.solution ?? null,
    overrides.architecture ?? null,
    overrides.stack ?? ['nestjs', 'postgres'],
    overrides.status ?? 'published',
    overrides.featured ?? false,
    overrides.repositoryUrl ?? null,
    overrides.demoUrl ?? null,
    overrides.coverImageUrl ?? null,
    overrides.sortOrder ?? 1,
    overrides.type ?? 'web',
    overrides.operationalStatus ?? 'active',
    overrides.complexity ?? 'media',
    overrides.context ?? null,
    overrides.objective ?? null,
    overrides.restrictions ?? [],
    overrides.technicalDecisions ?? [],
    overrides.security ?? [],
    overrides.result ?? null,
    overrides.learnings ?? null,
    overrides.improvements ?? null,
    overrides.highlights ?? [],
    overrides.role ?? null,
    overrides.createdAt ?? now,
    overrides.updatedAt ?? now,
  );
}

describe('GetProjectBySlugUseCase', () => {
  it('devuelve el proyecto cuando está publicado', async () => {
    const project = createProject({ status: 'published' });
    const repo = {
      findBySlug: jest.fn().mockResolvedValue(project),
    } as unknown as ProjectRepositoryPort;

    const useCase = new GetProjectBySlugUseCase(repo);
    const result = await useCase.execute('titulo-del-proyecto');

    expect(repo.findBySlug).toHaveBeenCalledWith('titulo-del-proyecto');
    expect(result).toBe(project);
  });

  it('devuelve null cuando el proyecto no está publicado', async () => {
    const project = createProject({ status: 'draft' });
    const repo = {
      findBySlug: jest.fn().mockResolvedValue(project),
    } as unknown as ProjectRepositoryPort;

    const useCase = new GetProjectBySlugUseCase(repo);
    const result = await useCase.execute('titulo-del-proyecto');

    expect(result).toBeNull();
  });

  it('devuelve null cuando no existe el proyecto', async () => {
    const repo = {
      findBySlug: jest.fn().mockResolvedValue(null),
    } as unknown as ProjectRepositoryPort;

    const useCase = new GetProjectBySlugUseCase(repo);
    const result = await useCase.execute('no-existe');

    expect(result).toBeNull();
  });
});

describe('GetPublicProjectsUseCase', () => {
  it('devuelve todos los proyectos publicados si no hay término de búsqueda', async () => {
    const projects = [
      createProject({ id: 'p1', slug: 'proyecto-uno' }),
      createProject({ id: 'p2', slug: 'proyecto-dos' }),
    ];
    const repo = {
      findAllPublished: jest.fn().mockResolvedValue(projects),
    } as unknown as ProjectRepositoryPort;

    const useCase = new GetPublicProjectsUseCase(repo);
    const result = await useCase.execute();

    expect(repo.findAllPublished).toHaveBeenCalled();
    expect(result).toHaveLength(2);
  });

  it('filtra por texto en título, resumen, tipo o stack', async () => {
    const projects = [
      createProject({ id: 'p1', title: 'Sistema de tránsito', stack: ['nestjs'] }),
      createProject({
        id: 'p2',
        title: 'Vendor POS',
        summary: 'Integración con pagos',
        type: 'integration',
      }),
      createProject({ id: 'p3', title: 'Mi Patagones', stack: ['react', 'node'], type: 'web' }),
    ];
    const repo = {
      findAllPublished: jest.fn().mockResolvedValue(projects),
    } as unknown as ProjectRepositoryPort;

    const useCase = new GetPublicProjectsUseCase(repo);

    const byTitle = await useCase.execute('tránsito');
    expect(byTitle).toHaveLength(1);
    expect(byTitle[0].id).toBe('p1');

    const bySummary = await useCase.execute('pagos');
    expect(bySummary).toHaveLength(1);
    expect(bySummary[0].id).toBe('p2');

    const byType = await useCase.execute('integration');
    expect(byType).toHaveLength(1);
    expect(byType[0].id).toBe('p2');

    const byStack = await useCase.execute('react');
    expect(byStack).toHaveLength(1);
    expect(byStack[0].id).toBe('p3');
  });

  it('devuelve lista vacía si ningún proyecto coincide', async () => {
    const projects = [createProject({ title: 'Sistema municipal' })];
    const repo = {
      findAllPublished: jest.fn().mockResolvedValue(projects),
    } as unknown as ProjectRepositoryPort;

    const useCase = new GetPublicProjectsUseCase(repo);
    const result = await useCase.execute('blockchain');

    expect(result).toEqual([]);
  });
});

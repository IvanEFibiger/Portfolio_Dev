import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as request from 'supertest';
import { LabModule } from '../src/modules/lab/lab.module';
import { LabOrmEntity } from '../src/modules/lab/infrastructure/persistence/lab.orm-entity';
import { AdminUserOrmEntity } from '../src/modules/auth/admin-user.orm-entity';

function createLabOrm(overrides: Partial<LabOrmEntity> = {}): LabOrmEntity {
  const now = new Date();
  return {
    id: 'lab-1',
    labNumber: 'LAB-001',
    title: 'RAG local con Ollama',
    slug: 'rag-local-ollama',
    description: 'Recuperación semántica local',
    status: 'Documentado',
    stack: ['Ollama', 'pgvector'],
    learning: 'Aprendizaje del lab',
    sortOrder: 1,
    published: true,
    createdAt: now,
    updatedAt: now,
    ...overrides,
  } as LabOrmEntity;
}

describe('Public Lab (e2e)', () => {
  let app: INestApplication;
  const labRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
  };
  const adminUserRepository = {
    findOne: jest.fn(),
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ConfigModule.forRoot({ isGlobal: true }), LabModule],
    })
      .overrideProvider(ConfigService)
      .useValue({
        get: (key: string) => {
          if (key === 'jwt.secret') return 'test-secret-with-at-least-32-characters-long';
          if (key === 'jwt.expiration') return '1h';
          return undefined;
        },
      })
      .overrideProvider(getRepositoryToken(LabOrmEntity))
      .useValue(labRepository)
      .overrideProvider(getRepositoryToken(AdminUserOrmEntity))
      .useValue(adminUserRepository)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(() => {
    labRepository.find.mockReset();
    labRepository.findOne.mockReset();
  });

  it('GET /public/lab responde 200 con la lista publicada', () => {
    const labs = [createLabOrm({ id: 'lab-1' }), createLabOrm({ id: 'lab-2', slug: 'otro-lab' })];
    labRepository.find.mockResolvedValue(labs);

    return request(app.getHttpServer())
      .get('/public/lab')
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveLength(2);
        expect(res.body[0].slug).toBe('rag-local-ollama');
        expect(res.body[1].slug).toBe('otro-lab');
      });
  });

  it('GET /public/lab/:slug responde 200 para un lab publicado', () => {
    const lab = createLabOrm({ status: 'Documentado' });
    labRepository.findOne.mockResolvedValue(lab);

    return request(app.getHttpServer())
      .get('/public/lab/rag-local-ollama')
      .expect(200)
      .expect((res) => {
        expect(res.body.slug).toBe('rag-local-ollama');
        expect(res.body.status).toBe('Documentado');
      });
  });

  it('GET /public/lab/:slug responde 404 si no existe', () => {
    labRepository.findOne.mockResolvedValue(null);

    return request(app.getHttpServer()).get('/public/lab/no-existe').expect(404);
  });

  it('GET /public/lab/:slug responde 404 para un lab no publicado', () => {
    const lab = createLabOrm({ status: 'Archivado', published: false });
    labRepository.findOne.mockResolvedValue(lab);

    return request(app.getHttpServer()).get('/public/lab/rag-local-ollama').expect(404);
  });
});

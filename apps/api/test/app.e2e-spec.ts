import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { TypeOrmHealthIndicator } from '@nestjs/terminus';
import * as request from 'supertest';
import { HealthModule } from '../src/modules/health/health.module';

describe('Health (e2e smoke)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [HealthModule],
    })
      // El smoke test valida la capa HTTP, no la DB real: el indicador de
      // base se mockea como "up" para que el test sea determinista sin Postgres.
      .overrideProvider(TypeOrmHealthIndicator)
      .useValue({
        pingCheck: async (key: string) => ({ [key]: { status: 'up' } }),
      })
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('GET /health responde 200', () => {
    return request(app.getHttpServer()).get('/health').expect(200);
  });
});

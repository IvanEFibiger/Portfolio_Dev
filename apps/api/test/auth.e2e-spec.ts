import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as request from 'supertest';
import { AuthModule } from '../src/modules/auth/auth.module';
import { AdminUserOrmEntity } from '../src/modules/auth/admin-user.orm-entity';

describe('Auth (e2e)', () => {
  let app: INestApplication;
  const adminUserRepository = {
    findOne: jest.fn(),
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ConfigModule.forRoot({ isGlobal: true }), AuthModule],
    })
      .overrideProvider(ConfigService)
      .useValue({
        get: (key: string) => {
          if (key === 'jwt.secret') return 'test-secret-with-at-least-32-characters-long';
          if (key === 'jwt.expiration') return '1h';
          return undefined;
        },
      })
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
    adminUserRepository.findOne.mockReset();
  });

  it('POST /admin/auth/login con credenciales inválidas responde 401', () => {
    adminUserRepository.findOne.mockResolvedValue(null);

    return request(app.getHttpServer())
      .post('/admin/auth/login')
      .send({ email: 'noexiste@example.com', password: 'wrongpassword' })
      .expect(401)
      .expect((res) => {
        expect(res.body.message).toBe('Credenciales inválidas');
      });
  });
});

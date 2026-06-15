import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { AdminUserOrmEntity } from './admin-user.orm-entity';
import { AuthService, JwtPayload } from './auth.service';
import { LoginDto } from './dto/login.dto';

jest.mock('bcrypt', () => ({
  compare: jest.fn(),
  hash: jest.fn(),
}));

describe('AuthService', () => {
  let service: AuthService;
  let adminUserRepository: { findOne: jest.Mock };
  let jwtService: { sign: jest.Mock<string, [JwtPayload]> };
  let comparePassword: jest.Mock<Promise<boolean>, [string, string]>;

  const loginDto: LoginDto = {
    email: 'admin@example.com',
    password: 'password-secreto',
  };

  const adminUser: AdminUserOrmEntity = {
    id: 'admin-1',
    email: 'admin@example.com',
    passwordHash: 'hashed-password',
    displayName: 'Admin',
    role: 'admin',
    isActive: true,
    createdAt: new Date('2026-01-01T00:00:00.000Z'),
    updatedAt: new Date('2026-01-01T00:00:00.000Z'),
  };

  async function expectInvalidCredentials(promise: Promise<unknown>): Promise<void> {
    try {
      await promise;
      throw new Error('Se esperaba UnauthorizedException');
    } catch (error) {
      expect(error).toBeInstanceOf(UnauthorizedException);
      expect((error as Error).message).toBe('Credenciales inv\u00e1lidas');
    }
  }

  beforeEach(() => {
    adminUserRepository = {
      findOne: jest.fn(),
    };
    jwtService = {
      sign: jest.fn().mockReturnValue('fake-token'),
    };
    comparePassword = bcrypt.compare as unknown as jest.Mock<Promise<boolean>, [string, string]>;
    comparePassword.mockReset();

    service = new AuthService(
      adminUserRepository as unknown as Repository<AdminUserOrmEntity>,
      jwtService as unknown as JwtService,
    );
  });

  it('devuelve un access token cuando las credenciales son validas', async () => {
    adminUserRepository.findOne.mockResolvedValue(adminUser);
    comparePassword.mockResolvedValue(true);

    const result = await service.login(loginDto);

    expect(adminUserRepository.findOne).toHaveBeenCalledWith({
      where: { email: loginDto.email, isActive: true },
    });
    expect(comparePassword).toHaveBeenCalledWith(loginDto.password, adminUser.passwordHash);
    expect(jwtService.sign).toHaveBeenCalledWith({
      sub: adminUser.id,
      email: adminUser.email,
      role: adminUser.role,
    });
    expect(result).toEqual({
      accessToken: 'fake-token',
      expiresIn: '1h',
    });
  });

  it('lanza UnauthorizedException cuando el usuario no existe', async () => {
    adminUserRepository.findOne.mockResolvedValue(null);

    await expectInvalidCredentials(service.login(loginDto));
    expect(comparePassword).not.toHaveBeenCalled();
    expect(jwtService.sign).not.toHaveBeenCalled();
  });

  it('lanza UnauthorizedException cuando el password es incorrecto', async () => {
    adminUserRepository.findOne.mockResolvedValue(adminUser);
    comparePassword.mockResolvedValue(false);

    await expectInvalidCredentials(service.login(loginDto));
    expect(comparePassword).toHaveBeenCalledWith(loginDto.password, adminUser.passwordHash);
    expect(jwtService.sign).not.toHaveBeenCalled();
  });
});

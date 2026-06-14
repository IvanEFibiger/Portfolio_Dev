import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { AdminUserOrmEntity } from './admin-user.orm-entity';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

export interface JwtPayload {
  sub: string;
  email: string;
  role: string;
}

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AdminUserOrmEntity)
    private readonly adminUserRepository: Repository<AdminUserOrmEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async login(dto: LoginDto): Promise<{ accessToken: string; expiresIn: string }> {
    const user = await this.adminUserRepository.findOne({
      where: { email: dto.email, isActive: true },
    });

    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.passwordHash);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken,
      expiresIn: '1h',
    };
  }

  async register(dto: RegisterDto) {
    const existing = await this.adminUserRepository.findOne({
      where: { email: dto.email },
    });

    if (existing) {
      throw new ConflictException('El email ya está registrado');
    }

    const passwordHash = await bcrypt.hash(dto.password, 12);

    const user = this.adminUserRepository.create({
      email: dto.email,
      passwordHash,
      displayName: dto.displayName,
      role: 'admin',
      isActive: true,
    });

    const saved = await this.adminUserRepository.save(user);

    return {
      id: saved.id,
      email: saved.email,
      displayName: saved.displayName,
      role: saved.role,
    };
  }

  async getProfile(userId: string) {
    const user = await this.adminUserRepository.findOne({
      where: { id: userId, isActive: true },
    });

    if (!user) {
      throw new UnauthorizedException('Usuario no encontrado');
    }

    return {
      id: user.id,
      email: user.email,
      displayName: user.displayName,
      role: user.role,
    };
  }
}

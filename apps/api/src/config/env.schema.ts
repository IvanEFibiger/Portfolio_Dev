import { plainToInstance } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
  validateSync,
} from 'class-validator';

enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
}

class EnvironmentVariables {
  @IsEnum(Environment)
  NODE_ENV: Environment = Environment.Development;

  @IsNumber()
  @IsOptional()
  PORT?: number;

  @IsString()
  @IsNotEmpty()
  DB_HOST!: string;

  @IsNumber()
  @IsOptional()
  DB_PORT?: number;

  @IsString()
  @IsNotEmpty()
  DB_USERNAME!: string;

  @IsString()
  @IsNotEmpty()
  DB_PASSWORD!: string;

  @IsString()
  @IsNotEmpty()
  DB_DATABASE!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(32, { message: 'JWT_SECRET debe tener al menos 32 caracteres' })
  JWT_SECRET!: string;

  @IsString()
  @IsOptional()
  JWT_EXPIRATION?: string;

  @IsString()
  @IsOptional()
  CORS_ORIGIN?: string;

  @IsString()
  @IsOptional()
  CACHE_DRIVER?: string;

  @IsNumber()
  @IsOptional()
  CACHE_TTL?: number;

  @IsString()
  @IsOptional()
  CACHE_REDIS_URL?: string;

  @IsString()
  @IsOptional()
  SITE_URL?: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(`Environment validation failed:\n${errors.toString()}`);
  }

  const INSECURE_DEFAULTS = [
    'cambiar-este-secreto-en-produccion',
    'dev-jwt-secret-cambiar-en-produccion-abc123',
  ];
  if (
    validatedConfig.NODE_ENV === Environment.Production &&
    INSECURE_DEFAULTS.includes(validatedConfig.JWT_SECRET)
  ) {
    throw new Error(
      'JWT_SECRET tiene un valor por defecto inseguro: definí uno real en producción.',
    );
  }

  return validatedConfig;
}

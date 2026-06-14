import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as path from 'path';

export function getTypeOrmConfig(configService: ConfigService): TypeOrmModuleOptions {
  return {
    type: 'postgres',
    host: configService.get<string>('database.host'),
    port: configService.get<number>('database.port'),
    username: configService.get<string>('database.username'),
    password: configService.get<string>('database.password'),
    database: configService.get<string>('database.database'),
    entities: [
      path.join(__dirname, '../../modules/**/infrastructure/persistence/*.orm-entity{.ts,.js}'),
      path.join(__dirname, '../../modules/auth/*.orm-entity{.ts,.js}'),
    ],
    migrations: [path.join(__dirname, './migrations/*{.ts,.js}')],
    synchronize: false,
    migrationsRun: true,
    logging: configService.get<string>('nodeEnv') === 'development',
  };
}

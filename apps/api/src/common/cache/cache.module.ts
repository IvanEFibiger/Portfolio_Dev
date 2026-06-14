import { CacheModule as NestCacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    NestCacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        ttl: (config.get<number>('cache.ttl') ?? 300) * 1000,
        max: config.get<number>('cache.max') ?? 100,
      }),
    }),
  ],
  exports: [NestCacheModule],
})
export class CacheModule {}

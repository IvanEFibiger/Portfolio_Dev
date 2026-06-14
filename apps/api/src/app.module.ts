import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import configuration from './config/configuration';
import { validate } from './config/env.schema';
import { getTypeOrmConfig } from './infrastructure/database/typeorm.config';
import { HealthModule } from './modules/health/health.module';
import { AuthModule } from './modules/auth/auth.module';
import { ArticlesModule } from './modules/articles/articles.module';
import { ProjectsModule } from './modules/projects/projects.module';
import { LabModule } from './modules/lab/lab.module';
import { ContactModule } from './modules/contact/contact.module';
import { NewsletterModule } from './modules/newsletter/newsletter.module';
import { AnalyticsModule } from './modules/analytics/analytics.module';
import { SitemapModule } from './modules/sitemap/sitemap.module';
import { CacheModule } from './common/cache/cache.module';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { TimeoutInterceptor } from './common/interceptors/timeout.interceptor';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '../../.env'],
      load: [configuration],
      validate,
    }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: getTypeOrmConfig,
    }),

    ThrottlerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        throttlers: [
          {
            ttl: (config.get<number>('throttle.ttl') ?? 60) * 1000,
            limit: config.get<number>('throttle.limit') ?? 10,
          },
        ],
      }),
    }),

    HealthModule,
    AuthModule,
    ArticlesModule,
    ProjectsModule,
    LabModule,
    ContactModule,
    NewsletterModule,
    AnalyticsModule,
    SitemapModule,
    CacheModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TimeoutInterceptor,
    },
  ],
})
export class AppModule {}

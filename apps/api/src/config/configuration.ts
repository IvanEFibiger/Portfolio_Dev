export default () => ({
  port: parseInt(process.env.PORT ?? '3000', 10),
  nodeEnv: process.env.NODE_ENV ?? 'development',

  database: {
    host: process.env.DB_HOST ?? 'localhost',
    port: parseInt(process.env.DB_PORT ?? '5432', 10),
    username: process.env.DB_USERNAME ?? 'portfolio',
    password: process.env.DB_PASSWORD ?? '',
    database: process.env.DB_DATABASE ?? 'portfolio_ivan',
  },

  jwt: {
    secret: process.env.JWT_SECRET ?? '',
    expiration: process.env.JWT_EXPIRATION ?? '1h',
  },

  cors: {
    // Acepta uno o varios origenes separados por coma.
    origins: (process.env.CORS_ORIGIN ?? 'http://localhost:4650,http://localhost:4200')
      .split(',')
      .map((origin) => origin.trim())
      .filter(Boolean),
  },

  throttle: {
    ttl: parseInt(process.env.THROTTLE_TTL ?? '60', 10),
    limit: parseInt(process.env.THROTTLE_LIMIT ?? '10', 10),
  },

  swagger: {
    enabled: process.env.SWAGGER_ENABLED === 'true',
  },

  cache: {
    driver: process.env.CACHE_DRIVER ?? 'memory',
    ttl: parseInt(process.env.CACHE_TTL ?? '60000', 10),
    redisUrl: process.env.CACHE_REDIS_URL ?? 'redis://localhost:6379',
  },

  siteUrl: process.env.SITE_URL ?? 'https://ivanfibigerdev.com',
});

# ============================================
# API NestJS — build multi-stage para producción
# ============================================

# ---- build ----
FROM node:22-alpine AS build
WORKDIR /app
# Toolchain para compilar bcrypt (módulo nativo) en Alpine.
RUN apk add --no-cache python3 make g++
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# ---- runtime ----
FROM node:22-alpine AS runner
WORKDIR /app
RUN apk add --no-cache python3 make g++
ENV NODE_ENV=production
COPY package*.json ./
# Solo dependencias de producción (recompila bcrypt para este stage).
RUN npm ci --omit=dev && npm cache clean --force
COPY --from=build /app/dist ./dist
EXPOSE 3000
# Migraciones + seed idempotente del admin + arranque. SIN seeds de contenido.
CMD ["sh", "-c", "node node_modules/typeorm/cli.js migration:run -d dist/infrastructure/database/data-source.js && node dist/infrastructure/database/seeds/admin.seed.js && node dist/main"]

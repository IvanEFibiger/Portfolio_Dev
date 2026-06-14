FROM node:22-alpine AS base
WORKDIR /app

# Toolchain para compilar modulos nativos (bcrypt via node-pre-gyp) en Alpine.
RUN apk add --no-cache python3 make g++

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["sh", "-c", "npm run migration:run && npm run seed:admin && npx ts-node -r tsconfig-paths/register src/infrastructure/database/seeds/projects.seed.ts && npx ts-node -r tsconfig-paths/register src/infrastructure/database/seeds/articles.seed.ts && npx ts-node -r tsconfig-paths/register src/infrastructure/database/seeds/lab.seed.ts && npm run start:prod"]

# ============================================
# Frontend Angular con SSR (Node) — multi-stage
# ============================================

# ---- build ----
FROM node:22-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# ---- runtime (servidor SSR) ----
# El bundle de servidor de Angular es autocontenido (esbuild empaqueta express,
# http-proxy-middleware y el resto), por lo que el runtime solo necesita Node y
# la carpeta dist. No se copia node_modules.
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=4000

COPY --from=build /app/dist/portfolio-ivan-web ./dist/portfolio-ivan-web

EXPOSE 4000

CMD ["node", "dist/portfolio-ivan-web/server/server.mjs"]

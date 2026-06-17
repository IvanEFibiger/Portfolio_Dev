# Portfolio Personal - Ivan Fibiger

Plataforma tecnica personal full-stack: portfolio profesional, bitacora del programador administrable, gestor de proyectos/casos de estudio, laboratorio tecnico y muestra viva de arquitectura, seguridad y buenas practicas.

> Software, seguridad y arquitectura para construir soluciones que funcionen fuera del tutorial.

---

## Estado actual

**Aplicacion full-stack funcional con SSR.**

El proyecto ya cuenta con backend NestJS, frontend Angular, panel admin, contenido publico, laboratorio, SEO dinamico, sitemap/robots, SSR runtime, Docker Compose y hardening base. No es un esqueleto: se puede levantar la app completa, administrar contenido y renderizar rutas publicas desde el servidor.

### Implementado

- Backend NestJS modular con PostgreSQL, TypeORM, migraciones, seeds y Swagger en desarrollo.
- Frontend Angular con rutas publicas, layout, shell admin, login, guard e interceptor JWT.
- CRUD admin de articulos, proyectos y laboratorio; gestion de mensajes, newsletter, settings y analytics.
- Contenido publico: home, sobre mi, proyectos, bitacora, laboratorio, contacto y "como esta construido".
- Editor de contenido por bloques para articulos y renderer compartido.
- SEO dinamico con meta tags, Open Graph, Twitter Cards, JSON-LD, `sitemap.xml` y `robots.txt`.
- SSR Angular runtime con proxy interno `/api` y Dockerfile web basado en Node.
- Seguridad base: Helmet con CSP, CORS, rate limiting, validacion global, JWT con expiracion validada en frontend.
- UX polish: dark/light theme, estados loading/empty/error, busquedas, 404 dedicada y microinteracciones.
- Documentacion de despliegue VPS + NGINX + SSL.

---

## Objetivo

No es una landing page generica de desarrollador. Es una plataforma que refleja capacidad tecnica real: analisis, arquitectura backend/frontend, seguridad aplicada, desarrollo full stack, documentacion y pensamiento de producto.

---

## Stack tecnologico

| Capa | Tecnologia |
|---|---|
| Frontend | Angular (standalone components, signals, nuevo control flow, SSR) |
| Backend | NestJS (modular, TypeScript) |
| Base de datos | PostgreSQL |
| ORM | TypeORM (migraciones, sin `synchronize` en produccion) |
| Autenticacion | JWT (auth propia, sin Keycloak) |
| Validacion | class-validator + DTOs |
| Infraestructura | Docker Compose, NGINX para VPS |
| Observabilidad | nestjs-pino + analytics simple |
| Documentacion | Markdown en `/docs` |

---

## Arquitectura

**Monolito modular + hexagonal pragmatica + Clean Code.**

- Modulos con logica de negocio (articles, projects, lab, contact, newsletter, analytics): separacion pragmatica de dominio, aplicacion, infraestructura e interfaces.
- Modulos simples (health, config, auth, sitemap): estructura directa sin capas innecesarias.
- Monorepo simple sin herramientas de monorepo externas.
- Frontend Angular con rutas lazy, shells separados para zona publica/admin, servicios core y componentes compartidos.

Ver: [docs/architecture.md](docs/architecture.md) | [ADR 0001](docs/decisions/0001-architecture-style.md)

---

## Estructura del proyecto

```text
portfolio-ivan/
|-- apps/
|   |-- api/                    # Backend NestJS
|   |   |-- src/
|   |   |   |-- config/         # Configuracion y validacion de entorno
|   |   |   |-- common/         # Guards, filters, interceptors, cache
|   |   |   |-- modules/        # Modulos de negocio y soporte
|   |   |   |   |-- articles/   # Bitacora del programador administrable
|   |   |   |   |-- projects/   # Casos de estudio
|   |   |   |   |-- lab/        # Laboratorio tecnico
|   |   |   |   |-- contact/    # Mensajes de contacto
|   |   |   |   |-- newsletter/ # Suscriptores
|   |   |   |   |-- analytics/  # Page views y summary admin
|   |   |   |   |-- sitemap/    # sitemap.xml y robots.txt
|   |   |   |   |-- auth/       # Login admin JWT
|   |   |   |   `-- health/     # Healthcheck
|   |   |   `-- infrastructure/ # Database, migrations, seeds
|   |   `-- test/               # E2E
|   `-- web/                    # Frontend Angular + SSR
|       |-- src/server.ts       # Express SSR + proxy /api
|       `-- src/app/
|           |-- core/           # Servicios, guards, interceptors, shells
|           |-- shared/         # Componentes, modelos y utilidades
|           `-- features/
|               |-- public/     # Home, about, projects, blog, lab, contact
|               `-- admin/      # Dashboard, CRUDs y metricas
|-- packages/shared/            # Tipos compartidos
|-- docs/                       # Documentacion tecnica
|-- docker/nginx/               # Reverse proxy para VPS
|-- docker-compose.yml
|-- docker-compose.prod.yml
|-- .env.example
`-- README.md
```

---

## Secciones del sitio

### Zona publica

| Ruta actual | Seccion |
|---|---|
| `/` | Inicio |
| `/sobre-mi` | Sobre mi |
| `/proyectos` | Proyectos |
| `/proyectos/:slug` | Detalle de proyecto |
| `/bitacora` | Bitacora del programador |
| `/bitacora/:slug` | Articulo individual |
| `/laboratorio` | Laboratorio |
| `/contacto` | Contacto |
| `/como-esta-construido` | Como esta construido este portfolio |

### Panel admin

| Ruta | Seccion |
|---|---|
| `/admin/login` | Login |
| `/admin/dashboard` | Dashboard |
| `/admin/articles` | Gestion de articulos |
| `/admin/projects` | Gestion de proyectos |
| `/admin/lab` | Gestion de laboratorio |
| `/admin/contact-messages` | Mensajes de contacto |
| `/admin/newsletter` | Suscriptores |
| `/admin/analytics` | Metricas |
| `/admin/settings` | Configuracion |

---

## Levantar con Docker

La app completa se levanta con un solo comando:

```bash
docker compose up -d --build
```

Servicios expuestos por defecto:

| Servicio | URL |
|---|---|
| Web SSR | `http://localhost:4650` |
| API | `http://localhost:4651` |
| Swagger | `http://localhost:4651/api/docs` |
| PostgreSQL | `localhost:54650` |

El contenedor `api` espera a PostgreSQL, corre migraciones/seeds y arranca NestJS. El contenedor `web` sirve Angular SSR en Node y proxya `/api` hacia el backend interno.

El usuario admin lo crea el seed a partir de las variables `ADMIN_EMAIL` y
`ADMIN_PASSWORD`. En local, el `docker-compose.yml` trae un default solo para
desarrollo (`admin@portfolio.com` / contraseña de ejemplo); cambialo definiendo
esas variables en un `.env`. En producción son **obligatorias**: el
`docker-compose.prod.yml` no arranca sin `ADMIN_PASSWORD` y no existe ningún
valor por defecto.

Para apagar:

```bash
docker compose down
```

Para borrar tambien la base local:

```bash
docker compose down -v
```

---

## Comandos locales

```bash
# Instalar dependencias
cd apps/api && npm install
cd apps/web && npm install

# Levantar backend
cd apps/api && npm run start:dev

# Levantar frontend dev
cd apps/web && npm start

# Build SSR frontend
cd apps/web && npm run build

# Correr migraciones y seeds
cd apps/api && npm run migration:run
cd apps/api && npm run seed:admin
cd apps/api && npm run seed:content

# Correr tests
cd apps/api && npm test
cd apps/api && npm run test:e2e
cd apps/web && npm test
```

---

## Roadmap vigente

Ver [docs/roadmap.md](docs/roadmap.md) para el detalle verificado contra el codigo.

Pendientes principales actuales:

1. Completar tests de integracion de repositories.
2. Confirmacion de email en newsletter, si se decide implementarla.
3. Refresh token, si el modelo de sesion lo requiere.
4. Mantener y ampliar documentacion segun evolucione el producto.

---

## Documentacion

| Documento | Contenido |
|---|---|
| [architecture.md](docs/architecture.md) | Arquitectura general y decisiones |
| [backend-guidelines.md](docs/backend-guidelines.md) | Convenciones del backend |
| [frontend-guidelines.md](docs/frontend-guidelines.md) | Convenciones del frontend |
| [security-guidelines.md](docs/security-guidelines.md) | Lineamientos de seguridad |
| [database-model.md](docs/database-model.md) | Modelo de datos conceptual |
| [api-contracts.md](docs/api-contracts.md) | Contratos de API previstos |
| [DEPLOYMENT.md](docs/DEPLOYMENT.md) | Despliegue VPS + NGINX + SSL |
| [improvement-plan.md](docs/improvement-plan.md) | Plan de mejoras profesionales |
| [visual-identity.md](docs/visual-identity.md) | Identidad visual y personalidad |
| [roadmap.md](docs/roadmap.md) | Roadmap por fases |

---

## Licencia

Proyecto personal. Todos los derechos reservados.

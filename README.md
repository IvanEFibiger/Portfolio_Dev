# Portfolio Personal — Iván Fibiger

Plataforma técnica personal que funciona como portfolio profesional, blog técnico administrable, gestor de proyectos/casos de estudio, laboratorio técnico y muestra viva de arquitectura, seguridad y buenas prácticas.

> Software, seguridad y arquitectura para construir soluciones que funcionen fuera del tutorial.

---

## Objetivo

No es una landing page genérica de desarrollador. Es una plataforma que refleja capacidad técnica real: análisis, arquitectura backend/frontend, seguridad aplicada, desarrollo full stack, documentación y pensamiento de producto.

---

## Stack tecnológico

| Capa | Tecnología |
|---|---|
| Frontend | Angular (standalone components, signals, nuevo control flow) |
| Backend | NestJS (modular, TypeScript) |
| Base de datos | PostgreSQL |
| ORM | TypeORM (migraciones, sin synchronize en producción) |
| Autenticación | JWT (auth propia, sin Keycloak) |
| Validación | class-validator + DTOs |
| Infraestructura | Docker Compose |
| Documentación | Markdown en `/docs` |

---

## Arquitectura

**Monolito modular + hexagonal pragmática + Clean Code.**

- Módulos con lógica de negocio (articles, projects): hexagonal pragmática con separación de dominio, aplicación, infraestructura e interfaces.
- Módulos simples (health, config): estructura directa sin capas innecesarias.
- Monorepo simple sin herramientas de monorepo externas.

Ver: [docs/architecture.md](docs/architecture.md) | [ADR 0001](docs/decisions/0001-architecture-style.md)

---

## Estructura del proyecto

```
portfolio-ivan/
├── apps/
│   ├── api/                    # Backend NestJS
│   │   ├── src/
│   │   │   ├── config/         # Configuración y validación de entorno
│   │   │   ├── common/         # Decorators, filters, guards, interceptors, pipes
│   │   │   ├── modules/        # Módulos de negocio
│   │   │   │   ├── articles/   # Hexagonal pragmática
│   │   │   │   ├── projects/   # Hexagonal pragmática
│   │   │   │   ├── contact/    # Hexagonal pragmática
│   │   │   │   ├── newsletter/ # Hexagonal pragmática
│   │   │   │   ├── analytics/  # Hexagonal pragmática
│   │   │   │   ├── auth/       # Estructura simple
│   │   │   │   ├── admin/      # Estructura simple
│   │   │   │   └── health/     # Estructura simple
│   │   │   └── infrastructure/ # Database, mail, storage, logger
│   │   └── test/               # Unit, integration, e2e
│   └── web/                    # Frontend Angular
│       └── src/app/
│           ├── core/           # Servicios singleton, guards, interceptors
│           ├── shared/         # Componentes y pipes reutilizables
│           ├── layout/         # Header, footer, sidebar
│           ├── features/
│           │   ├── public/     # Home, about, projects, articles, lab, contact
│           │   └── admin/      # Dashboard, CRUD, métricas
│           ├── styles/         # Variables CSS, temas, tipografía
│           └── config/         # Configuración de la app
├── packages/
│   └── shared/                 # Tipos e interfaces compartidas
├── docs/                       # Documentación técnica
├── docker/                     # Dockerfiles y scripts
├── docker-compose.yml
├── .env.example
├── AGENT.md
└── README.md
```

---

## Secciones del sitio

### Zona pública

| Ruta | Sección |
|---|---|
| `/` | Inicio |
| `/about` | Sobre mí |
| `/projects` | Proyectos |
| `/projects/:slug` | Detalle de proyecto |
| `/blog` | Bitácora técnica |
| `/blog/:slug` | Artículo individual |
| `/lab` | Laboratorio |
| `/contact` | Contacto |
| `/built-with` | Cómo está construido este portfolio |

### Panel admin

| Ruta | Sección |
|---|---|
| `/admin/login` | Login |
| `/admin/dashboard` | Dashboard |
| `/admin/articles` | Gestión de artículos |
| `/admin/projects` | Gestión de proyectos |
| `/admin/contact-messages` | Mensajes de contacto |
| `/admin/newsletter` | Suscriptores |
| `/admin/analytics` | Métricas |
| `/admin/settings` | Configuración |

---

## Levantar con Docker

La app completa se levanta con un solo comando:

```bash
docker compose up --build
```

Servicios expuestos:

| Servicio | URL |
|---|---|
| Web | `http://localhost:4200` |
| API | `http://localhost:3000` |
| Swagger | `http://localhost:3000/api/docs` |
| PostgreSQL | `localhost:55432` |

El contenedor `api` espera a PostgreSQL, corre migraciones, ejecuta el seed admin y luego arranca NestJS.

Credenciales admin de desarrollo:

```txt
Email: admin@portfolio.com
Password: admin123
```

Para apagar:

```bash
docker compose down
```

Para borrar también la base local:

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

# Levantar frontend
cd apps/web && ng serve

# Correr migraciones
cd apps/api && npm run migration:run

# Correr tests
cd apps/api && npm run test
cd apps/api && npm run test:e2e
cd apps/web && ng test
```

---

## Estado actual

**Fase 0 — Estructura inicial.**

- Estructura de carpetas creada.
- Documentación base.
- Convenciones definidas.
- Sin implementación funcional.
- Sin dependencias instaladas.
- Sin código productivo.

---

## Próximos pasos

Ver [docs/roadmap.md](docs/roadmap.md) para el detalle completo.

1. **Fase 1** — Base funcional: NestJS, Angular, PostgreSQL, Docker, healthcheck, auth admin.
2. **Fase 2** — MVP: CRUD artículos/proyectos, frontend público, contacto, newsletter, analytics.
3. **Fase 3** — Mejoras: editor estructurado, SSR, búsqueda, SEO, hardening, testing e2e.

---

## Documentación

| Documento | Contenido |
|---|---|
| [architecture.md](docs/architecture.md) | Arquitectura general y decisiones |
| [backend-guidelines.md](docs/backend-guidelines.md) | Convenciones del backend |
| [frontend-guidelines.md](docs/frontend-guidelines.md) | Convenciones del frontend |
| [security-guidelines.md](docs/security-guidelines.md) | Lineamientos de seguridad |
| [database-model.md](docs/database-model.md) | Modelo de datos conceptual |
| [api-contracts.md](docs/api-contracts.md) | Contratos de API previstos |
| [visual-identity.md](docs/visual-identity.md) | Identidad visual y personalidad |
| [roadmap.md](docs/roadmap.md) | Roadmap por fases |

---

## Licencia

Proyecto personal. Todos los derechos reservados.

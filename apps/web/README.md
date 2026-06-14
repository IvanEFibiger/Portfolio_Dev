# Frontend Angular - Portfolio Ivan Fibiger

Aplicacion Angular standalone para el portfolio tecnico personal/profesional.

## Objetivo

El frontend no esta planteado como landing estatica. Funciona como plataforma publica + panel admin:

- Home tecnica con posicionamiento profesional.
- Casos de estudio de proyectos reales.
- Bitacora tecnica preparada para contenido estructurado desde API.
- Laboratorio tecnico.
- Contacto profesional.
- Panel admin inicial para articulos, proyectos, mensajes, newsletter y analytics.

## Stack

- Angular standalone components.
- Angular Router con lazy loading por rutas.
- TypeScript strict.
- Reactive Forms.
- Signals para estado local simple.
- Interceptors HTTP para JWT y errores 401.
- Guards para rutas admin.
- SCSS global con identidad visual sobria.

## Estructura

```txt
src/app
├── core
│   ├── guards
│   ├── interceptors
│   ├── layout
│   ├── services
│   └── tokens
├── shared
│   ├── components
│   ├── mocks
│   ├── models
│   └── utils
├── features
│   ├── public
│   └── admin
└── app.routes.ts
```

## Rutas publicas

- `/`
- `/sobre-mi`
- `/proyectos`
- `/proyectos/:slug`
- `/bitacora`
- `/bitacora/:slug`
- `/laboratorio`
- `/contacto`
- `/como-esta-construido`

## Rutas admin

- `/admin/login`
- `/admin/dashboard`
- `/admin/articles`
- `/admin/articles/create`
- `/admin/articles/edit/:id`
- `/admin/projects`
- `/admin/projects/create`
- `/admin/projects/edit/:id`
- `/admin/contact-messages`
- `/admin/newsletter`
- `/admin/analytics`
- `/admin/settings`

## API y mocks

Los servicios estan preparados para consumir la API documentada en `docs/api-contracts.md`.

Mientras `environment.useMocks` sea `true`, usan datos mock separados en `src/app/shared/mocks`.
Para integrar backend real:

1. Cambiar `environment.useMocks` a `false`.
2. Configurar `environment.apiBaseUrl`.
3. Validar payloads de admin contra DTOs reales.
4. Reemplazar comentarios TODO por manejo de error/estado definitivo.

## Comandos

```bash
npm install
npm run start
npm run build
```

SSR/prerendering queda fuera de esta fase inicial, pero las paginas publicas estan estructuradas para incorporarlo despues.

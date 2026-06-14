import { ArticleDetail } from '../models/article.model';

export const MOCK_ARTICLES: ArticleDetail[] = [
  {
    id: 'article-software-completo',
    slug: 'software-completo-contexto-real',
    title: 'No soy solo full stack: qué significa construir software completo en contexto real',
    excerpt:
      'Full stack no debería significar saber tocar dos capas. En sistemas reales también importan datos, permisos, despliegue, auditoría y mantenimiento.',
    category: 'Arquitectura',
    tags: ['Arquitectura', 'Full stack', 'Mantenimiento'],
    status: 'published',
    publishedAt: '2026-04-10T10:00:00.000Z',
    readingTimeMinutes: 7,
    seoTitle: 'Construir software completo en contexto real',
    seoDescription: 'Una mirada técnica sobre desarrollo full stack aplicado a sistemas reales.',
    content: {
      blocks: [
        {
          type: 'paragraph',
          text: 'Construir software completo no es conectar una pantalla con un endpoint y dar por cerrado el trabajo.',
        },
        { type: 'heading', level: 2, text: 'El contexto cambia las decisiones' },
        {
          type: 'paragraph',
          text: 'Un sistema real tiene usuarios, permisos, errores, despliegues, datos históricos y restricciones operativas. Cada una de esas piezas condiciona la arquitectura.',
        },
        {
          type: 'quote',
          text: 'El código importa, pero también importan los datos, los permisos, los logs, la seguridad y lo que pasa cuando algo falla.',
        },
        {
          type: 'callout',
          variant: 'info',
          title: 'Criterio técnico',
          text: 'La diferencia está en diseñar para operar y mantener, no solo para mostrar.',
        },
        {
          type: 'list',
          ordered: false,
          items: [
            'Análisis del problema',
            'Contratos claros',
            'Autorización desde el inicio',
            'Documentación útil',
            'Deploy repetible',
          ],
        },
      ],
    },
  },
  {
    id: 'article-autorizacion-granular',
    slug: 'autorizacion-granular-plataforma-municipal',
    title: 'Diseñando autorización granular para una plataforma municipal',
    excerpt:
      'Roles, scopes y restricciones por área: cómo pensar permisos cuando una aplicación crece más allá del CRUD inicial.',
    category: 'Seguridad aplicada',
    tags: ['RBAC', 'Scopes', 'Municipalidad', 'JWT'],
    status: 'published',
    publishedAt: '2026-04-14T10:00:00.000Z',
    readingTimeMinutes: 9,
    content: {
      blocks: [
        {
          type: 'paragraph',
          text: 'En una plataforma municipal no alcanza con distinguir usuario administrador y usuario común.',
        },
        { type: 'heading', level: 2, text: 'Permisos como contrato operativo' },
        {
          type: 'paragraph',
          text: 'Los permisos tienen que representar responsabilidades reales: área, acción, recurso y alcance.',
        },
        {
          type: 'code',
          language: 'ts',
          code: "type Scope = 'articles:write' | 'projects:publish' | 'messages:read';",
        },
        {
          type: 'callout',
          variant: 'warning',
          title: 'Riesgo frecuente',
          text: 'Cuando la autorización queda para el final, la UI termina ocultando problemas que el backend debería resolver.',
        },
      ],
    },
  },
  {
    id: 'article-seguridad-diseno',
    slug: 'seguridad-desde-el-diseno',
    title: 'Por qué la seguridad tiene que estar desde el diseño y no al final',
    excerpt:
      'Seguridad aplicada no es una capa decorativa. Es una forma de decidir modelos, endpoints, logs y flujos de error.',
    category: 'Seguridad aplicada',
    tags: ['Seguridad', 'APIs', 'Validación'],
    status: 'published',
    publishedAt: '2026-04-18T10:00:00.000Z',
    readingTimeMinutes: 8,
    content: {
      blocks: [
        {
          type: 'paragraph',
          text: 'Agregar seguridad al final suele significar bloquear síntomas, no corregir decisiones de diseño.',
        },
        { type: 'heading', level: 2, text: 'Superficie de ataque cotidiana' },
        {
          type: 'paragraph',
          text: 'Validar entradas, limitar intentos, registrar eventos y cuidar respuestas de error son prácticas de construcción, no tareas de cierre.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Definir datos sensibles',
            'Validar DTOs',
            'Proteger acciones admin',
            'Registrar eventos útiles',
            'Evitar secretos en frontend',
          ],
        },
      ],
    },
  },
  {
    id: 'article-monolito-modular',
    slug: 'monolito-modular-sistemas-municipales',
    title: 'Monolito modular vs microservicios en sistemas municipales',
    excerpt:
      'Por qué una arquitectura modular y pragmática suele ser mejor punto de partida que distribuir complejidad antes de tiempo.',
    category: 'Backend',
    tags: ['NestJS', 'Arquitectura', 'PostgreSQL'],
    status: 'draft',
    publishedAt: null,
    readingTimeMinutes: 6,
    content: {
      blocks: [
        { type: 'paragraph', text: 'Separar responsabilidades no obliga a separar despliegues.' },
        { type: 'heading', level: 2, text: 'Complejidad que se paga' },
        {
          type: 'paragraph',
          text: 'Microservicios agregan observabilidad, red, versionado y operación distribuida. Si el equipo no necesita eso, puede ser deuda prematura.',
        },
      ],
    },
  },
  {
    id: 'article-ia-criterio',
    slug: 'ia-acelerar-desarrollo-sin-perder-control',
    title: 'Cómo uso IA para acelerar desarrollo sin perder control técnico',
    excerpt:
      'IA como herramienta de trabajo: acelerar exploración y escritura sin delegar criterio, arquitectura ni validación.',
    category: 'IA local',
    tags: ['IA', 'Productividad', 'Revisión técnica'],
    status: 'published',
    publishedAt: '2026-04-22T10:00:00.000Z',
    readingTimeMinutes: 5,
    content: {
      blocks: [
        {
          type: 'paragraph',
          text: 'La IA sirve cuando el criterio técnico sigue del lado de quien construye el sistema.',
        },
        {
          type: 'callout',
          variant: 'success',
          title: 'Uso responsable',
          text: 'Pedir ayuda para acelerar no es lo mismo que aceptar una solución sin entender sus costos.',
        },
        {
          type: 'paragraph',
          text: 'La uso para comparar enfoques, generar borradores, revisar edge cases y documentar decisiones, pero verifico contratos, seguridad y comportamiento.',
        },
      ],
    },
  },
];

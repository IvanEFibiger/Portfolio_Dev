import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../../../.env') });

async function seed() {
  const dataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST ?? 'localhost',
    port: parseInt(process.env.DB_PORT ?? '5432', 10),
    username: process.env.DB_USERNAME ?? 'portfolio',
    password: process.env.DB_PASSWORD ?? '',
    database: process.env.DB_DATABASE ?? 'portfolio_ivan',
    synchronize: false,
  });

  await dataSource.initialize();

  const existing = await dataSource.query('SELECT id FROM articles WHERE slug = $1', [
    'software-completo-contexto-real',
  ]);

  if (existing.length > 0) {
    console.log('Articles already seeded');
    await dataSource.destroy();
    return;
  }

  const articles = [
    {
      title: 'No soy solo full stack: qué significa construir software completo en contexto real',
      slug: 'software-completo-contexto-real',
      excerpt:
        'Full stack no debería significar saber tocar dos capas. En sistemas reales también importan datos, permisos, despliegue, auditoría y mantenimiento.',
      content: JSON.stringify({
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
      }),
      status: 'published',
      visibility: 'public',
      reading_time_minutes: 7,
      published_at: '2026-04-10T10:00:00.000Z',
      seo_title: 'Construir software completo en contexto real',
      seo_description: 'Una mirada técnica sobre desarrollo full stack aplicado a sistemas reales.',
      category: 'Arquitectura',
      tags: JSON.stringify(['Arquitectura', 'Full stack', 'Mantenimiento']),
    },
    {
      title: 'Diseñando autorización granular para una plataforma municipal',
      slug: 'autorizacion-granular-plataforma-municipal',
      excerpt:
        'Roles, scopes y restricciones por área: cómo pensar permisos cuando una aplicación crece más allá del CRUD inicial.',
      content: JSON.stringify({
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
      }),
      status: 'published',
      visibility: 'public',
      reading_time_minutes: 9,
      published_at: '2026-04-14T10:00:00.000Z',
      seo_title: 'Autorización granular en plataformas municipales',
      seo_description:
        'Decisiones de arquitectura para implementar permisos por scope en sistemas con múltiples roles.',
      category: 'Seguridad aplicada',
      tags: JSON.stringify(['RBAC', 'Scopes', 'Municipalidad', 'JWT']),
    },
    {
      title: 'Por qué la seguridad tiene que estar desde el diseño y no al final',
      slug: 'seguridad-desde-el-diseno',
      excerpt:
        'Seguridad aplicada no es una capa decorativa. Es una forma de decidir modelos, endpoints, logs y flujos de error.',
      content: JSON.stringify({
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
      }),
      status: 'published',
      visibility: 'public',
      reading_time_minutes: 8,
      published_at: '2026-04-18T10:00:00.000Z',
      seo_title: 'Seguridad desde el diseño',
      seo_description: 'Reflexión práctica sobre aplicar security by design en sistemas reales.',
      category: 'Seguridad aplicada',
      tags: JSON.stringify(['Seguridad', 'APIs', 'Validación']),
    },
    {
      title: 'Monolito modular vs microservicios en sistemas municipales',
      slug: 'monolito-modular-sistemas-municipales',
      excerpt:
        'Por qué una arquitectura modular y pragmática suele ser mejor punto de partida que distribuir complejidad antes de tiempo.',
      content: JSON.stringify({
        blocks: [
          { type: 'paragraph', text: 'Separar responsabilidades no obliga a separar despliegues.' },
          { type: 'heading', level: 2, text: 'Complejidad que se paga' },
          {
            type: 'paragraph',
            text: 'Microservicios agregan observabilidad, red, versionado y operación distribuida. Si el equipo no necesita eso, puede ser deuda prematura.',
          },
        ],
      }),
      status: 'draft',
      visibility: 'public',
      reading_time_minutes: 6,
      published_at: null,
      seo_title: 'Monolito modular vs microservicios',
      seo_description:
        'Comparativa práctica desde la experiencia con plataformas municipales reales.',
      category: 'Backend',
      tags: JSON.stringify(['NestJS', 'Arquitectura', 'PostgreSQL']),
    },
    {
      title: 'Cómo uso IA para acelerar desarrollo sin perder control técnico',
      slug: 'ia-acelerar-desarrollo-sin-perder-control',
      excerpt:
        'IA como herramienta de trabajo: acelerar exploración y escritura sin delegar criterio, arquitectura ni validación.',
      content: JSON.stringify({
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
      }),
      status: 'published',
      visibility: 'public',
      reading_time_minutes: 5,
      published_at: '2026-04-22T10:00:00.000Z',
      seo_title: 'IA para acelerar desarrollo sin perder control',
      seo_description: 'Uso responsable de IA en desarrollo de software con criterio técnico.',
      category: 'IA local',
      tags: JSON.stringify(['IA', 'Productividad', 'Revisión técnica']),
    },
  ];

  for (const a of articles) {
    await dataSource.query(
      `INSERT INTO articles (
        id, title, slug, excerpt, content, status, visibility, reading_time_minutes,
        published_at, seo_title, seo_description, category, tags, created_at, updated_at
      ) VALUES (
        gen_random_uuid(), $1, $2, $3, $4, $5, $6, $7,
        $8, $9, $10, $11, $12, NOW(), NOW()
      )`,
      [
        a.title,
        a.slug,
        a.excerpt,
        a.content,
        a.status,
        a.visibility,
        a.reading_time_minutes,
        a.published_at,
        a.seo_title,
        a.seo_description,
        a.category,
        a.tags,
      ],
    );
    console.log(`Article seeded: ${a.title}`);
  }

  await dataSource.destroy();
  console.log('Articles seed completed');
}

seed().catch((err) => {
  console.error('Articles seed failed:', err);
  process.exit(1);
});

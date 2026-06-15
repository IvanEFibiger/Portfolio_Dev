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

  const existing = await dataSource.query('SELECT id FROM lab_items WHERE slug = $1', [
    'rag-local-ollama-pgvector',
  ]);

  if (existing.length > 0) {
    console.log('Lab already seeded');
    await dataSource.destroy();
    return;
  }

  const labs = [
    {
      lab_number: 'LAB-001',
      title: 'RAG local con Ollama y pgvector',
      slug: 'rag-local-ollama-pgvector',
      description:
        'Prueba de recuperacion semantica sobre documentos controlados con inferencia local.',
      status: 'En desarrollo',
      stack: ['Ollama', 'pgvector', 'PostgreSQL', 'NestJS'],
      learning:
        'El valor del RAG depende mas de la calidad del corpus y la evaluacion que del modelo elegido.',
      sort_order: 1,
      published: true,
    },
    {
      lab_number: 'LAB-002',
      title: 'Validacion JWT y autorizacion por scopes',
      slug: 'validacion-jwt-autorizacion-scopes',
      description: 'Modelo simple para proteger acciones admin por permisos explicitos.',
      status: 'Documentado',
      stack: ['JWT', 'NestJS', 'Guards', 'Scopes'],
      learning:
        'Los scopes son utiles si representan acciones reales y se auditan desde el backend.',
      sort_order: 2,
      published: true,
    },
    {
      lab_number: 'LAB-003',
      title: 'Docker Compose para staging',
      slug: 'docker-compose-staging',
      description:
        'Entorno reproducible para API, base de datos y frontend con variables separadas.',
      status: 'Explorando',
      stack: ['Docker', 'Compose', 'PostgreSQL', 'NGINX'],
      learning:
        'Un deploy simple y repetible suele ser mejor que una arquitectura grande sin operacion clara.',
      sort_order: 3,
      published: true,
    },
    {
      lab_number: 'LAB-004',
      title: 'Hardening basico de API NestJS',
      slug: 'hardening-basico-api-nestjs',
      description:
        'Checklist tecnico para validar datos, limitar abuso y mejorar respuestas ante errores.',
      status: 'Documentado',
      stack: ['NestJS', 'Helmet', 'Rate limiting', 'ValidationPipe'],
      learning:
        'La seguridad basica empieza en defaults estrictos y contratos de entrada bien definidos.',
      sort_order: 4,
      published: true,
    },
    {
      lab_number: 'LAB-005',
      title: 'Wireshark desde la mirada de un desarrollador',
      slug: 'wireshark-mirada-desarrollador',
      description:
        'Analisis de trafico para entender latencia, protocolos y fallas de integracion.',
      status: 'Explorando',
      stack: ['Wireshark', 'HTTP', 'TLS', 'Diagnostico'],
      learning:
        'Mirar la red ayuda a detectar problemas que no aparecen leyendo solo logs de aplicacion.',
      sort_order: 5,
      published: true,
    },
  ];

  for (const lab of labs) {
    await dataSource.query(
      `INSERT INTO lab_items (
        id, lab_number, title, slug, description, status, stack, learning, sort_order, published, created_at, updated_at
      ) VALUES (
        gen_random_uuid(), $1, $2, $3, $4, $5, $6, $7, $8, $9, NOW(), NOW()
      )`,
      [
        lab.lab_number,
        lab.title,
        lab.slug,
        lab.description,
        lab.status,
        JSON.stringify(lab.stack),
        lab.learning,
        lab.sort_order,
        lab.published,
      ],
    );
    console.log(`Lab seeded: ${lab.title}`);
  }

  await dataSource.destroy();
  console.log('Lab seed completed');
}

seed().catch((err) => {
  console.error('Lab seed failed:', err);
  process.exit(1);
});

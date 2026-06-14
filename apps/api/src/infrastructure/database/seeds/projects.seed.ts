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

  const existing = await dataSource.query('SELECT id FROM projects WHERE slug = $1', [
    'mi-patagones',
  ]);

  if (existing.length > 0) {
    console.log('Projects already seeded');
    await dataSource.destroy();
    return;
  }

  const projects = [
    {
      title: 'Mi Patagones',
      slug: 'mi-patagones',
      summary:
        'Plataforma modular para centralizar aplicaciones municipales, identidad digital, acceso ciudadano y gestión interna.',
      description:
        'Plataforma modular para centralizar aplicaciones municipales, identidad digital ciudadana, acceso y gestión interna. Autorización granular con integración progresiva.',
      problem:
        'Las aplicaciones municipales suelen crecer aisladas, con identidades duplicadas, permisos inconsistentes y baja trazabilidad operativa.',
      solution:
        'Monolito modular con API backend, frontend Angular por dominios, autenticación centralizada y autorización granular.',
      architecture:
        'Separación por módulos funcionales, contratos REST, persistencia PostgreSQL y despliegue local con Docker Compose.',
      stack: JSON.stringify(['Angular', 'NestJS', 'PostgreSQL', 'Keycloak', 'Docker', 'Redis']),
      status: 'published',
      featured: true,
      sort_order: 1,
      type: 'Plataforma municipal',
      operational_status: 'active',
      complexity: 'Alta',
      context:
        'Ecosistema de servicios digitales para una municipalidad con usuarios ciudadanos y operadores internos.',
      objective:
        'Unificar acceso, construir una base modular y permitir integrar nuevas áreas sin rehacer la plataforma.',
      restrictions: JSON.stringify([
        'Integración progresiva con sistemas existentes.',
        'Permisos diferenciados por rol y alcance operativo.',
        'Mantenimiento posible por equipos chicos.',
      ]),
      technical_decisions: JSON.stringify([
        'Módulos por capacidad municipal, no por pantalla.',
        'Contratos documentados antes de cerrar la UI.',
        'Datos y permisos tratados como parte central del diseño.',
      ]),
      security: JSON.stringify([
        'Autenticación centralizada.',
        'Scopes y roles por operación.',
        'Auditoría pensada para acciones sensibles.',
      ]),
      result:
        'Base escalable para incorporar trámites, paneles internos y servicios ciudadanos sin perder control de permisos.',
      learnings:
        'En contexto municipal la arquitectura debe acompañar procesos reales, no imponer una abstracción ajena a la operación.',
      improvements:
        'Profundizar observabilidad, trazabilidad por usuario y automatización de despliegues.',
      highlights: JSON.stringify(['Backend + Frontend', 'Sistema operativo', 'Seguridad aplicada']),
      role: 'Arquitecto y desarrollador full stack. Diseñé la arquitectura modular, implementé el backend NestJS, el frontend Angular con autenticación centralizada y configuré el despliegue con Docker.',
    },
    {
      title: 'Gateway NETQR / RAFAM',
      slug: 'gateway-netqr-rafam',
      summary:
        'Gateway de integración entre sistemas municipales de recaudación y pagos QR, con foco en idempotencia, seguridad y auditoría.',
      description:
        'Gateway de integración entre sistemas de recaudación y pagos QR municipales. Foco en idempotencia, seguridad, callbacks, auditoría y resiliencia operativa.',
      problem:
        'Los pagos externos requieren callbacks confiables, conciliación clara y defensa contra operaciones duplicadas o inconsistentes.',
      solution:
        'API gateway con persistencia transaccional, claves de idempotencia, validación estricta y estados explícitos.',
      architecture:
        'Controladores delgados, casos de uso para flujo de pago, repositorios TypeORM y tabla de eventos operativos.',
      stack: JSON.stringify([
        'NestJS',
        'PostgreSQL',
        'Docker',
        'TypeORM',
        'Testing',
        'Seguridad aplicada',
      ]),
      status: 'published',
      featured: true,
      sort_order: 2,
      type: 'Integración de pagos',
      operational_status: 'dev',
      complexity: 'Alta',
      context:
        'Integración entre recaudación municipal, proveedor de pagos y sistemas administrativos existentes.',
      objective:
        'Procesar operaciones de pago QR con resiliencia, idempotencia y registros auditables.',
      restrictions: JSON.stringify([
        'Callbacks externos no controlados por la aplicación.',
        'Necesidad de evitar doble impacto financiero.',
        'Trazabilidad para soporte y auditoría.',
      ]),
      technical_decisions: JSON.stringify([
        'Idempotencia como requisito del dominio.',
        'Estados de operación explícitos.',
        'Errores diferenciados para soporte técnico.',
      ]),
      security: JSON.stringify([
        'Validación de payloads.',
        'Control de callbacks.',
        'Logs sin datos sensibles innecesarios.',
      ]),
      result:
        'Base técnica para operar pagos con menor riesgo de duplicación y mejor capacidad de diagnóstico.',
      learnings:
        'En integraciones financieras, el caso feliz vale poco si no se piensa qué pasa cuando algo llega tarde, duplicado o incompleto.',
      improvements: 'Agregar tablero operativo con alertas y métricas de conciliación.',
      highlights: JSON.stringify([
        'Backend + integraciones',
        'Idempotencia + auditoría',
        'Testing exhaustivo',
      ]),
      role: 'Diseñé e implementé el gateway de integración, definí el modelo de idempotencia y los flujos de conciliación.',
    },
    {
      title: 'Sistema de Exámenes de Tránsito',
      slug: 'sistema-examenes-transito',
      summary:
        'Sistema para toma de exámenes, evaluación automática, generación de PDFs y registro de resultados.',
      description:
        'Sistema para toma de exámenes, evaluación automática, generación de PDFs y registro de resultados para la administración municipal.',
      problem:
        'La evaluación manual genera demoras, registros dispersos y poca trazabilidad de resultados.',
      solution:
        'Aplicación con flujo guiado de examen, corrección automática y registro persistente de resultados.',
      architecture:
        'Frontend Flutter, backend .NET, autenticación JWT y base PostgreSQL para preguntas, exámenes y resultados.',
      stack: JSON.stringify(['Flutter', '.NET', 'C#', 'PostgreSQL', 'JWT', 'PDF']),
      status: 'published',
      featured: true,
      sort_order: 3,
      type: 'Sistema administrativo',
      operational_status: 'active',
      complexity: 'Media',
      context: 'Operación local para gestión de exámenes teóricos en área de tránsito.',
      objective: 'Digitalizar la toma, corrección y respaldo de exámenes.',
      restrictions: JSON.stringify([
        'Uso operativo simple.',
        'Administración local.',
        'Generación de comprobantes.',
      ]),
      technical_decisions: JSON.stringify([
        'Modelo de preguntas parametrizable.',
        'PDF como comprobante operativo.',
        'Roles básicos de administración.',
      ]),
      security: JSON.stringify([
        'JWT para acceso admin.',
        'Separación de datos de evaluación.',
        'Validaciones del lado servidor.',
      ]),
      result: 'Proceso más rápido, registros centralizados y salida documental consistente.',
      learnings:
        'La UX operativa debe reducir fricción sin ocultar reglas administrativas importantes.',
      improvements: 'Agregar auditoría de cambios en banco de preguntas y reportes históricos.',
      highlights: JSON.stringify(['Frontend Flutter', 'Backend .NET', 'Generación de PDF']),
      role: 'Desarrollé el sistema completo: frontend Flutter, backend .NET, lógica de evaluación y generación de comprobantes.',
    },
    {
      title: 'MARA AI',
      slug: 'mara-ai',
      summary:
        'Asistente virtual municipal con enfoque RAG para consultas ciudadanas sobre información local.',
      description:
        'Asistente virtual municipal con enfoque RAG para consultas ciudadanas sobre información local. Modelos corriendo completamente on-premise.',
      problem:
        'La información pública suele estar distribuida y es difícil de consultar en lenguaje natural con control de fuentes.',
      solution:
        'Pipeline RAG con embeddings, recuperación en pgvector y modelos locales servidos con Ollama.',
      architecture:
        'API NestJS, base vectorial PostgreSQL, jobs de ingesta y capa de respuesta con fuentes.',
      stack: JSON.stringify([
        'NestJS',
        'PostgreSQL',
        'pgvector',
        'Ollama',
        'RAG',
        'Modelos locales',
      ]),
      status: 'draft',
      featured: true,
      sort_order: 4,
      type: 'Asistente RAG municipal',
      operational_status: 'wip',
      complexity: 'Alta',
      context:
        'Exploración de IA aplicada a consultas ciudadanas con datos locales y fuentes controladas.',
      objective:
        'Responder consultas frecuentes sin depender de servicios externos para cada inferencia.',
      restrictions: JSON.stringify([
        'Costo controlado.',
        'Privacidad.',
        'Necesidad de trazabilidad de fuentes.',
      ]),
      technical_decisions: JSON.stringify([
        'RAG antes que fine-tuning.',
        'Modelos locales para pruebas.',
        'Respuestas con citas internas.',
      ]),
      security: JSON.stringify([
        'No exponer documentos privados.',
        'Filtrado por fuente.',
        'Registro de consultas sin datos sensibles.',
      ]),
      result: 'Laboratorio funcional para validar valor real de IA en atención ciudadana.',
      learnings:
        'La IA aporta si el dominio, los datos y las restricciones están bien delimitados.',
      improvements: 'Evaluación automática de respuestas y flujo de curación de documentos.',
      highlights: JSON.stringify(['IA + RAG', 'Modelos locales', 'pgvector + Ollama']),
      role: 'Exploré y desarrollé el pipeline RAG, configuré el almacenamiento vectorial y evalué modelos locales.',
    },
    {
      title: 'VendoraPOS',
      slug: 'vendorapos',
      summary:
        'Sistema modular de punto de venta y control de stock adaptable a distintos tipos de comercios.',
      description:
        'Sistema modular de punto de venta y control de stock adaptable a distintos tipos de comercios. Arquitectura preparada para evolucionar a web.',
      problem:
        'Muchos comercios necesitan control de ventas y stock sin depender de sistemas rígidos o sobredimensionados.',
      solution:
        'Módulos separados para ventas, inventario, clientes y reportes con persistencia relacional.',
      architecture: 'Dominio modular, PostgreSQL y evolución posible entre escritorio y web.',
      stack: JSON.stringify(['C#', 'PostgreSQL', 'Arquitectura modular', 'Desktop', 'Web']),
      status: 'published',
      featured: true,
      sort_order: 5,
      type: 'Producto de gestión',
      operational_status: 'dev',
      complexity: 'Media',
      context:
        'Producto orientado a comercios chicos y medianos con necesidades operativas concretas.',
      objective: 'Gestionar ventas, productos, stock y reportes con base extensible.',
      restrictions: JSON.stringify([
        'Adaptabilidad por rubro.',
        'Uso diario intensivo.',
        'Datos consistentes.',
      ]),
      technical_decisions: JSON.stringify([
        'Separar reglas de venta del almacenamiento.',
        'Modelo de stock auditable.',
        'Configuración por comercio.',
      ]),
      security: JSON.stringify([
        'Usuarios internos.',
        'Permisos por operación.',
        'Respaldo de datos como parte del diseño.',
      ]),
      result: 'Base de producto adaptable para distintos escenarios comerciales.',
      learnings:
        'Un POS no es solo emitir una venta: stock, cierres, permisos y reportes son parte del producto real.',
      improvements: 'Sincronización offline y tablero de indicadores por periodo.',
      highlights: JSON.stringify(['Desktop + Web', 'Gestión de stock', 'Arquitectura modular']),
      role: 'Diseñé la arquitectura modular del producto, implementé la lógica de ventas y stock, y planifiqué la evolución entre plataformas.',
    },
  ];

  for (const p of projects) {
    await dataSource.query(
      `INSERT INTO projects (
        id, title, slug, summary, description, problem, solution, architecture, stack,
        status, featured, sort_order, type, operational_status, complexity, context, objective,
        restrictions, technical_decisions, security, result, learnings, improvements, highlights, role,
        created_at, updated_at
      ) VALUES (
        gen_random_uuid(), $1, $2, $3, $4, $5, $6, $7, $8,
        $9, $10, $11, $12, $13, $14, $15, $16,
        $17, $18, $19, $20, $21, $22, $23, $24,
        NOW(), NOW()
      )`,
      [
        p.title,
        p.slug,
        p.summary,
        p.description,
        p.problem,
        p.solution,
        p.architecture,
        p.stack,
        p.status,
        p.featured,
        p.sort_order,
        p.type,
        p.operational_status,
        p.complexity,
        p.context,
        p.objective,
        p.restrictions,
        p.technical_decisions,
        p.security,
        p.result,
        p.learnings,
        p.improvements,
        p.highlights,
        p.role,
      ],
    );
    console.log(`Project seeded: ${p.title}`);
  }

  await dataSource.destroy();
  console.log('Projects seed completed');
}

seed().catch((err) => {
  console.error('Projects seed failed:', err);
  process.exit(1);
});

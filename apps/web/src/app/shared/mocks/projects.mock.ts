import { ProjectDetail } from '../models/project.model';

export const MOCK_PROJECTS: ProjectDetail[] = [
  {
    id: 'project-mi-patagones',
    slug: 'mi-patagones',
    title: 'Mi Patagones',
    type: 'Plataforma municipal',
    summary:
      'Plataforma modular para centralizar aplicaciones municipales, identidad digital, acceso ciudadano y gestión interna.',
    problem:
      'Las aplicaciones municipales suelen crecer aisladas, con identidades duplicadas, permisos inconsistentes y baja trazabilidad operativa.',
    stack: ['Angular', 'NestJS', 'PostgreSQL', 'Keycloak', 'Docker', 'Redis'],
    status: 'published',
    operationalStatus: 'active',
    complexity: 'Alta',
    featured: true,
    sortOrder: 1,
    highlights: ['Backend + Frontend', 'Sistema operativo', 'Seguridad aplicada'],
    role: 'Arquitecto y desarrollador full stack. Diseñé la arquitectura modular, implementé el backend NestJS, el frontend Angular con autenticación centralizada y configuré el despliegue con Docker.',
    context:
      'Ecosistema de servicios digitales para una municipalidad con usuarios ciudadanos y operadores internos.',
    objective:
      'Unificar acceso, construir una base modular y permitir integrar nuevas áreas sin rehacer la plataforma.',
    restrictions: [
      'Integración progresiva con sistemas existentes.',
      'Permisos diferenciados por rol y alcance operativo.',
      'Mantenimiento posible por equipos chicos.',
    ],
    solution:
      'Monolito modular con API backend, frontend Angular por dominios, autenticación centralizada y autorización granular.',
    architecture:
      'Separación por módulos funcionales, contratos REST, persistencia PostgreSQL y despliegue local con Docker Compose.',
    technicalDecisions: [
      'Módulos por capacidad municipal, no por pantalla.',
      'Contratos documentados antes de cerrar la UI.',
      'Datos y permisos tratados como parte central del diseño.',
    ],
    security: [
      'Autenticación centralizada.',
      'Scopes y roles por operación.',
      'Auditoría pensada para acciones sensibles.',
    ],
    result:
      'Base escalable para incorporar trámites, paneles internos y servicios ciudadanos sin perder control de permisos.',
    learnings:
      'En contexto municipal la arquitectura debe acompañar procesos reales, no imponer una abstracción ajena a la operación.',
    improvements:
      'Profundizar observabilidad, trazabilidad por usuario y automatización de despliegues.',
  },
  {
    id: 'project-netqr-rafam',
    slug: 'gateway-netqr-rafam',
    title: 'Gateway NETQR / RAFAM',
    type: 'Integración de pagos',
    summary:
      'Gateway de integración entre sistemas municipales de recaudación y pagos QR, con foco en idempotencia, seguridad y auditoría.',
    problem:
      'Los pagos externos requieren callbacks confiables, conciliación clara y defensa contra operaciones duplicadas o inconsistentes.',
    stack: ['NestJS', 'PostgreSQL', 'Docker', 'TypeORM', 'Testing', 'Seguridad aplicada'],
    status: 'published',
    operationalStatus: 'dev',
    complexity: 'Alta',
    featured: true,
    sortOrder: 2,
    highlights: ['Backend + integraciones', 'Idempotencia + auditoría', 'Testing exhaustivo'],
    role: 'Diseñé e implementé el gateway de integración, definí el modelo de idempotencia y los flujos de conciliación.',
    context:
      'Integración entre recaudación municipal, proveedor de pagos y sistemas administrativos existentes.',
    objective:
      'Procesar operaciones de pago QR con resiliencia, idempotencia y registros auditables.',
    restrictions: [
      'Callbacks externos no controlados por la aplicación.',
      'Necesidad de evitar doble impacto financiero.',
      'Trazabilidad para soporte y auditoría.',
    ],
    solution:
      'API gateway con persistencia transaccional, claves de idempotencia, validación estricta y estados explícitos.',
    architecture:
      'Controladores delgados, casos de uso para flujo de pago, repositorios TypeORM y tabla de eventos operativos.',
    technicalDecisions: [
      'Idempotencia como requisito del dominio.',
      'Estados de operación explícitos.',
      'Errores diferenciados para soporte técnico.',
    ],
    security: [
      'Validación de payloads.',
      'Control de callbacks.',
      'Logs sin datos sensibles innecesarios.',
    ],
    result:
      'Base técnica para operar pagos con menor riesgo de duplicación y mejor capacidad de diagnóstico.',
    learnings:
      'En integraciones financieras, el caso feliz vale poco si no se piensa qué pasa cuando algo llega tarde, duplicado o incompleto.',
    improvements: 'Agregar tablero operativo con alertas y métricas de conciliación.',
  },
  {
    id: 'project-transito',
    slug: 'sistema-examenes-transito',
    title: 'Sistema de Exámenes de Tránsito',
    type: 'Sistema administrativo',
    summary:
      'Sistema para toma de exámenes, evaluación automática, generación de PDFs y registro de resultados.',
    problem:
      'La evaluación manual genera demoras, registros dispersos y poca trazabilidad de resultados.',
    stack: ['Flutter', '.NET', 'C#', 'PostgreSQL', 'JWT', 'PDF'],
    status: 'published',
    operationalStatus: 'active',
    complexity: 'Media',
    featured: true,
    sortOrder: 3,
    highlights: ['Frontend Flutter', 'Backend .NET', 'Generación de PDF'],
    role: 'Desarrollé el sistema completo: frontend Flutter, backend .NET, lógica de evaluación y generación de comprobantes.',
    context: 'Operación local para gestión de exámenes teóricos en área de tránsito.',
    objective: 'Digitalizar la toma, corrección y respaldo de exámenes.',
    restrictions: ['Uso operativo simple.', 'Administración local.', 'Generación de comprobantes.'],
    solution:
      'Aplicación con flujo guiado de examen, corrección automática y registro persistente de resultados.',
    architecture:
      'Frontend Flutter, backend .NET, autenticación JWT y base PostgreSQL para preguntas, exámenes y resultados.',
    technicalDecisions: [
      'Modelo de preguntas parametrizable.',
      'PDF como comprobante operativo.',
      'Roles básicos de administración.',
    ],
    security: [
      'JWT para acceso admin.',
      'Separación de datos de evaluación.',
      'Validaciones del lado servidor.',
    ],
    result: 'Proceso más rápido, registros centralizados y salida documental consistente.',
    learnings:
      'La UX operativa debe reducir fricción sin ocultar reglas administrativas importantes.',
    improvements: 'Agregar auditoría de cambios en banco de preguntas y reportes históricos.',
  },
  {
    id: 'project-mara-ai',
    slug: 'mara-ai',
    title: 'MARA AI',
    type: 'Asistente RAG municipal',
    summary:
      'Asistente virtual municipal con enfoque RAG para consultas ciudadanas sobre información local.',
    problem:
      'La información pública suele estar distribuida y es difícil de consultar en lenguaje natural con control de fuentes.',
    stack: ['NestJS', 'PostgreSQL', 'pgvector', 'Ollama', 'RAG', 'Modelos locales'],
    status: 'draft',
    operationalStatus: 'wip',
    complexity: 'Alta',
    featured: true,
    sortOrder: 4,
    highlights: ['IA + RAG', 'Modelos locales', 'pgvector + Ollama'],
    role: 'Exploré y desarrollé el pipeline RAG, configuré el almacenamiento vectorial y evalué modelos locales.',
    context:
      'Exploración de IA aplicada a consultas ciudadanas con datos locales y fuentes controladas.',
    objective:
      'Responder consultas frecuentes sin depender de servicios externos para cada inferencia.',
    restrictions: ['Costo controlado.', 'Privacidad.', 'Necesidad de trazabilidad de fuentes.'],
    solution:
      'Pipeline RAG con embeddings, recuperación en pgvector y modelos locales servidos con Ollama.',
    architecture:
      'API NestJS, base vectorial PostgreSQL, jobs de ingesta y capa de respuesta con fuentes.',
    technicalDecisions: [
      'RAG antes que fine-tuning.',
      'Modelos locales para pruebas.',
      'Respuestas con citas internas.',
    ],
    security: [
      'No exponer documentos privados.',
      'Filtrado por fuente.',
      'Registro de consultas sin datos sensibles.',
    ],
    result: 'Laboratorio funcional para validar valor real de IA en atención ciudadana.',
    learnings: 'La IA aporta si el dominio, los datos y las restricciones están bien delimitados.',
    improvements: 'Evaluación automática de respuestas y flujo de curación de documentos.',
  },
  {
    id: 'project-vendorapos',
    slug: 'vendorapos',
    title: 'VendoraPOS',
    type: 'Producto de gestión',
    summary:
      'Sistema modular de punto de venta y control de stock adaptable a distintos tipos de comercios.',
    problem:
      'Muchos comercios necesitan control de ventas y stock sin depender de sistemas rígidos o sobredimensionados.',
    stack: ['C#', 'PostgreSQL', 'Arquitectura modular', 'Desktop', 'Web'],
    status: 'published',
    operationalStatus: 'dev',
    complexity: 'Media',
    featured: true,
    sortOrder: 5,
    highlights: ['Desktop + Web', 'Gestión de stock', 'Arquitectura modular'],
    role: 'Diseñé la arquitectura modular del producto, implementé la lógica de ventas y stock, y planifiqué la evolución entre plataformas.',
    context:
      'Producto orientado a comercios chicos y medianos con necesidades operativas concretas.',
    objective: 'Gestionar ventas, productos, stock y reportes con base extensible.',
    restrictions: ['Adaptabilidad por rubro.', 'Uso diario intensivo.', 'Datos consistentes.'],
    solution:
      'Módulos separados para ventas, inventario, clientes y reportes con persistencia relacional.',
    architecture: 'Dominio modular, PostgreSQL y evolución posible entre escritorio y web.',
    technicalDecisions: [
      'Separar reglas de venta del almacenamiento.',
      'Modelo de stock auditable.',
      'Configuración por comercio.',
    ],
    security: [
      'Usuarios internos.',
      'Permisos por operación.',
      'Respaldo de datos como parte del diseño.',
    ],
    result: 'Base de producto adaptable para distintos escenarios comerciales.',
    learnings:
      'Un POS no es solo emitir una venta: stock, cierres, permisos y reportes son parte del producto real.',
    improvements: 'Sincronización offline y tablero de indicadores por periodo.',
  },
];

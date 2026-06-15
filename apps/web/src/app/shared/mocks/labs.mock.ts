import { LabItem } from '../models/lab.model';

export const MOCK_LABS: LabItem[] = [
  {
    id: 'lab-rag-local',
    labNumber: 'LAB-001',
    title: 'RAG local con Ollama y pgvector',
    slug: 'rag-local-ollama-pgvector',
    description:
      'Prueba de recuperacion semantica sobre documentos controlados con inferencia local.',
    status: 'En desarrollo',
    stack: ['Ollama', 'pgvector', 'PostgreSQL', 'NestJS'],
    learning:
      'El valor del RAG depende mas de la calidad del corpus y la evaluacion que del modelo elegido.',
    sortOrder: 1,
    published: true,
  },
  {
    id: 'lab-jwt-scopes',
    labNumber: 'LAB-002',
    title: 'Validacion JWT y autorizacion por scopes',
    slug: 'validacion-jwt-autorizacion-scopes',
    description: 'Modelo simple para proteger acciones admin por permisos explicitos.',
    status: 'Documentado',
    stack: ['JWT', 'NestJS', 'Guards', 'Scopes'],
    learning: 'Los scopes son utiles si representan acciones reales y se auditan desde el backend.',
    sortOrder: 2,
    published: true,
  },
  {
    id: 'lab-compose-staging',
    labNumber: 'LAB-003',
    title: 'Docker Compose para staging',
    slug: 'docker-compose-staging',
    description: 'Entorno reproducible para API, base de datos y frontend con variables separadas.',
    status: 'Explorando',
    stack: ['Docker', 'Compose', 'PostgreSQL', 'NGINX'],
    learning:
      'Un deploy simple y repetible suele ser mejor que una arquitectura grande sin operacion clara.',
    sortOrder: 3,
    published: true,
  },
  {
    id: 'lab-hardening-api',
    labNumber: 'LAB-004',
    title: 'Hardening basico de API NestJS',
    slug: 'hardening-basico-api-nestjs',
    description:
      'Checklist tecnico para validar datos, limitar abuso y mejorar respuestas ante errores.',
    status: 'Documentado',
    stack: ['NestJS', 'Helmet', 'Rate limiting', 'ValidationPipe'],
    learning:
      'La seguridad basica empieza en defaults estrictos y contratos de entrada bien definidos.',
    sortOrder: 4,
    published: true,
  },
  {
    id: 'lab-wireshark-dev',
    labNumber: 'LAB-005',
    title: 'Wireshark desde la mirada de un desarrollador',
    slug: 'wireshark-mirada-desarrollador',
    description: 'Analisis de trafico para entender latencia, protocolos y fallas de integracion.',
    status: 'Explorando',
    stack: ['Wireshark', 'HTTP', 'TLS', 'Diagnostico'],
    learning:
      'Mirar la red ayuda a detectar problemas que no aparecen leyendo solo logs de aplicacion.',
    sortOrder: 5,
    published: true,
  },
];

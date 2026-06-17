import { AdminMetric, AnalyticsSummary } from '../models/analytics.model';
import { ContactMessage } from '../models/contact.model';
import { NewsletterSubscriber } from '../models/newsletter.model';

export const MOCK_ADMIN_METRICS: AdminMetric[] = [
  { label: 'Articulos publicados', value: 4, hint: 'Contenido visible en bitacora' },
  { label: 'Borradores', value: 1, hint: 'Pendientes de revision' },
  { label: 'Proyectos cargados', value: 5, hint: 'Casos de estudio iniciales' },
  { label: 'Mensajes nuevos', value: 3, hint: 'Requieren respuesta' },
  { label: 'Suscriptores', value: 28, hint: 'Lista tecnica propia' },
  { label: 'Visitas recientes', value: 412, hint: 'Ultimos 30 dias' },
];

export const MOCK_CONTACT_MESSAGES: ContactMessage[] = [
  {
    id: 'msg-1',
    name: 'Area de Modernizacion',
    email: 'modernizacion@municipio.gov.ar',
    company: 'Municipio de Patagones',
    subject: 'Integracion de sistemas',
    message:
      'Necesitamos integrar nuestro sistema de gestion municipal con la plataforma de tramites digitales. ¿Podriamos agendar una reunion para evaluar la arquitectura necesaria?',
    status: 'new',
    createdAt: '2026-04-25T09:30:00.000Z',
  },
  {
    id: 'msg-2',
    name: 'Comercio local',
    email: 'contacto@comercio.com',
    company: null,
    subject: 'Sistema de stock',
    message:
      'Hola, estamos buscando desarrollar un sistema de control de stock para nuestra cadena de comercios. Tenemos 3 sucursales y necesitamos sincronizacion en tiempo real.',
    status: 'read',
    createdAt: '2026-04-23T14:15:00.000Z',
  },
  {
    id: 'msg-3',
    name: 'Consultora tecnica',
    email: 'hola@consultora.dev',
    company: 'DevConsultores',
    subject: 'Revision de arquitectura',
    message:
      'Tenemos un sistema legacy en .NET Framework que necesitamos migrar progresivamente a microservicios. Nos interesa una revision de arquitectura antes de empezar.',
    status: 'answered',
    createdAt: '2026-04-19T11:45:00.000Z',
  },
];

export const MOCK_NEWSLETTER: NewsletterSubscriber[] = [
  {
    id: 'sub-1',
    email: 'dev.backend@mail.com',
    status: 'confirmed',
    subscribedAt: '2026-04-12T12:00:00.000Z',
  },
  {
    id: 'sub-2',
    email: 'arquitectura@mail.com',
    status: 'pending',
    subscribedAt: '2026-04-14T12:00:00.000Z',
  },
  {
    id: 'sub-3',
    email: 'seguridad@mail.com',
    status: 'confirmed',
    subscribedAt: '2026-04-18T12:00:00.000Z',
  },
];

export const MOCK_ANALYTICS: AnalyticsSummary = {
  totalPageViews: 412,
  uniqueVisitors: 87,
  ownerPageViews: 23,
  viewsByDate: [
    { date: '2026-04-24', views: 104 },
    { date: '2026-04-25', views: 136 },
    { date: '2026-04-26', views: 172 },
  ],
  recentVisits: [
    { path: '/proyectos/mi-patagones', createdAt: '2026-04-26T10:05:00.000Z', referrer: 'direct' },
    {
      path: '/bitacora/seguridad-desde-el-diseno',
      createdAt: '2026-04-26T09:50:00.000Z',
      referrer: 'linkedin',
    },
    { path: '/como-esta-construido', createdAt: '2026-04-26T09:20:00.000Z', referrer: 'direct' },
  ],
  topPages: [
    { path: '/', views: 128 },
    { path: '/proyectos', views: 94 },
    { path: '/bitacora', views: 71 },
  ],
  topArticles: [
    { title: 'Seguridad desde el diseño', views: 48 },
    { title: 'Autorización granular', views: 39 },
  ],
  topProjects: [
    { title: 'Mi Patagones', views: 63 },
    { title: 'Gateway NETQR / RAFAM', views: 52 },
  ],
};

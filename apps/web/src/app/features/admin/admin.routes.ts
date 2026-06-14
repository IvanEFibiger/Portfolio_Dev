import { Routes } from '@angular/router';

export const adminRoutes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./dashboard/dashboard.component').then((m) => m.DashboardComponent),
    title: 'Admin dashboard',
  },
  {
    path: 'articles',
    loadComponent: () =>
      import('./articles/admin-articles.component').then((m) => m.AdminArticlesComponent),
    title: 'Admin articulos',
  },
  {
    path: 'articles/create',
    loadComponent: () =>
      import('./articles/article-form.component').then((m) => m.ArticleFormComponent),
    title: 'Crear articulo',
  },
  {
    path: 'articles/edit/:id',
    loadComponent: () =>
      import('./articles/article-form.component').then((m) => m.ArticleFormComponent),
    title: 'Editar articulo',
  },
  {
    path: 'projects',
    loadComponent: () =>
      import('./projects/admin-projects.component').then((m) => m.AdminProjectsComponent),
    title: 'Admin proyectos',
  },
  {
    path: 'projects/create',
    loadComponent: () =>
      import('./projects/project-form.component').then((m) => m.ProjectFormComponent),
    title: 'Crear proyecto',
  },
  {
    path: 'projects/edit/:id',
    loadComponent: () =>
      import('./projects/project-form.component').then((m) => m.ProjectFormComponent),
    title: 'Editar proyecto',
  },
  {
    path: 'lab',
    loadComponent: () => import('./lab/admin-lab.component').then((m) => m.AdminLabComponent),
    title: 'Admin laboratorio',
  },
  {
    path: 'lab/create',
    loadComponent: () => import('./lab/lab-form.component').then((m) => m.LabFormComponent),
    title: 'Crear lab',
  },
  {
    path: 'lab/edit/:id',
    loadComponent: () => import('./lab/lab-form.component').then((m) => m.LabFormComponent),
    title: 'Editar lab',
  },
  {
    path: 'contact-messages',
    loadComponent: () =>
      import('./contact-messages/contact-messages.component').then(
        (m) => m.ContactMessagesComponent,
      ),
    title: 'Mensajes de contacto',
  },
  {
    path: 'newsletter',
    loadComponent: () =>
      import('./newsletter/newsletter.component').then((m) => m.NewsletterComponent),
    title: 'Newsletter',
  },
  {
    path: 'analytics',
    loadComponent: () =>
      import('./analytics/analytics.component').then((m) => m.AnalyticsComponent),
    title: 'Analytics',
  },
  {
    path: 'settings',
    loadComponent: () => import('./settings/settings.component').then((m) => m.SettingsComponent),
    title: 'Settings',
  },
];

// Rutas principales de la aplicación Angular
// TODO: Configurar rutas públicas y lazy loading del módulo admin
//
// Rutas públicas previstas:
//   /                 → Home
//   /about            → Sobre mí
//   /projects         → Proyectos
//   /projects/:slug   → Detalle de proyecto
//   /blog             → Bitácora técnica
//   /blog/:slug       → Artículo individual
//   /lab              → Laboratorio
//   /contact          → Contacto
//   /built-with       → Cómo está construido este portfolio
//
// Rutas admin previstas (lazy loaded):
//   /admin/login
//   /admin/dashboard
//   /admin/articles
//   /admin/articles/new
//   /admin/articles/:id/edit
//   /admin/projects
//   /admin/projects/new
//   /admin/projects/:id/edit
//   /admin/contact-messages
//   /admin/newsletter
//   /admin/analytics
//   /admin/settings
import { Routes } from '@angular/router';
import { PublicShellComponent } from './core/layout/public-shell.component';
import { AdminShellComponent } from './core/layout/admin-shell.component';
import { adminAuthGuard } from './core/guards/admin-auth.guard';

export const routes: Routes = [
  // Las rutas de admin deben ir ANTES del PublicShellComponent, porque ese
  // route tiene un path: '' (prefijo) con un wildcard '**' interno que
  // capturaría /admin y mostraría el 404 público en lugar de entrar al admin.
  {
    path: 'admin/login',
    loadComponent: () =>
      import('./features/admin/auth/login.component').then((m) => m.LoginComponent),
    title: 'Admin login - Ivan Fibiger',
  },
  {
    path: 'admin',
    component: AdminShellComponent,
    canActivate: [adminAuthGuard],
    canActivateChild: [adminAuthGuard],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      {
        path: '',
        loadChildren: () => import('./features/admin/admin.routes').then((m) => m.adminRoutes),
      },
    ],
  },
  {
    path: '',
    component: PublicShellComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/public/home/home.component').then((m) => m.HomeComponent),
        title: 'Ivan Fibiger - Systems & Software',
      },
      {
        path: 'sobre-mi',
        loadComponent: () =>
          import('./features/public/about/about.component').then((m) => m.AboutComponent),
        title: 'Sobre mi - Ivan Fibiger',
      },
      {
        path: 'proyectos',
        loadComponent: () =>
          import('./features/public/projects/projects.component').then((m) => m.ProjectsComponent),
        title: 'Proyectos - Ivan Fibiger',
      },
      {
        path: 'proyectos/:slug',
        loadComponent: () =>
          import('./features/public/projects/project-detail.component').then(
            (m) => m.ProjectDetailComponent,
          ),
      },
      {
        path: 'bitacora',
        loadComponent: () =>
          import('./features/public/articles/articles.component').then((m) => m.ArticlesComponent),
        title: 'Bitacora tecnica - Ivan Fibiger',
      },
      {
        path: 'bitacora/:slug',
        loadComponent: () =>
          import('./features/public/articles/article-detail.component').then(
            (m) => m.ArticleDetailComponent,
          ),
      },
      {
        path: 'laboratorio',
        loadComponent: () =>
          import('./features/public/lab/lab.component').then((m) => m.LabComponent),
        title: 'Laboratorio - Ivan Fibiger',
      },
      {
        path: 'laboratorio/:slug',
        loadComponent: () =>
          import('./features/public/lab/lab-detail.component').then((m) => m.LabDetailComponent),
      },
      {
        path: 'contacto',
        loadComponent: () =>
          import('./features/public/contact/contact.component').then((m) => m.ContactComponent),
        title: 'Contacto - Ivan Fibiger',
      },
      {
        path: 'como-esta-construido',
        loadComponent: () =>
          import('./features/public/built-with/built-with.component').then(
            (m) => m.BuiltWithComponent,
          ),
        title: 'Como esta construido - Ivan Fibiger',
      },
      {
        path: '**',
        loadComponent: () =>
          import('./features/public/not-found/not-found.component').then(
            (m) => m.NotFoundComponent,
          ),
        title: '404 - Ivan Fibiger',
      },
    ],
  },
  {
    path: '**',
    loadComponent: () =>
      import('./features/public/not-found/not-found.component').then((m) => m.NotFoundComponent),
    title: '404 - Ivan Fibiger',
  },
];

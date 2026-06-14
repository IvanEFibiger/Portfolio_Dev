import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-admin-shell',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  template: `
    <div class="admin-layout">
      <aside class="admin-sidebar">
        <a class="sidebar-logo" routerLink="/admin/dashboard">
          <div class="sidebar-logo-name">Ivan Fibiger</div>
          <div class="sidebar-logo-role">Admin panel</div>
        </a>

        <div class="sidebar-section-label">Contenido</div>
        <nav>
          <a [routerLink]="'/admin/dashboard'" routerLinkActive="is-active">
            <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5">
              <rect x="1" y="1" width="12" height="12" rx="1.5" />
              <path d="M1 5h12M5 1v12" />
            </svg>
            Dashboard
          </a>
          <a [routerLink]="'/admin/articles'" routerLinkActive="is-active">
            <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M2 3h10M2 7h7M2 11h9" />
            </svg>
            Artículos
          </a>
          <a [routerLink]="'/admin/projects'" routerLinkActive="is-active">
            <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5">
              <rect x="1" y="3" width="12" height="8" rx="1" />
              <path d="M1 6h12" />
            </svg>
            Proyectos
          </a>
          <a [routerLink]="'/admin/lab'" routerLinkActive="is-active">
            <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M5 1h4M6 1v4l-3.5 6A1.4 1.4 0 0 0 3.7 13h6.6a1.4 1.4 0 0 0 1.2-2L8 5V1" />
              <path d="M4 10h8" />
            </svg>
            Laboratorio
          </a>
        </nav>

        <div class="sidebar-section-label">Operaciones</div>
        <nav>
          <a [routerLink]="'/admin/contact-messages'" routerLinkActive="is-active">
            <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M7 1a6 6 0 1 0 0 12A6 6 0 0 0 7 1z" />
              <path d="M7 4v4l2 2" />
            </svg>
            Mensajes
          </a>
          <a [routerLink]="'/admin/newsletter'" routerLinkActive="is-active">
            <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M1 7h12M7 1v12" />
            </svg>
            Newsletter
          </a>
          <a [routerLink]="'/admin/analytics'" routerLinkActive="is-active">
            <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M2 11V7M5 11V4M8 11V6M11 11V2" />
            </svg>
            Analytics
          </a>
        </nav>

        <div class="sidebar-section-label">Sistema</div>
        <nav>
          <a [routerLink]="'/admin/settings'" routerLinkActive="is-active">
            <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5">
              <circle cx="7" cy="7" r="2" />
              <path d="M7 1v2M7 11v2M1 7h2M11 7h2" />
            </svg>
            Configuración
          </a>
        </nav>

        <button class="logout-btn" type="button" (click)="auth.logoutAndRedirect()">Salir</button>
      </aside>
      <section class="admin-content">
        <router-outlet />
      </section>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminShellComponent {
  readonly auth = inject(AuthService);
}

import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-public-shell',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  template: `
    <nav class="public-header">
      <div class="nav-inner">
        <a class="nav-logo" routerLink="/" aria-label="Inicio">
          <span class="nav-logo-name">Ivan Fibiger</span>
          <span class="nav-logo-sub">Systems & Software</span>
        </a>

        <ul class="nav-links" [class.open]="menuOpen()">
          @for (item of navItems; track item.path) {
            <li>
              <a
                [routerLink]="item.path"
                routerLinkActive="is-active"
                [routerLinkActiveOptions]="{ exact: item.path === '/' }"
                (click)="menuOpen.set(false)"
              >
                {{ item.label }}
              </a>
            </li>
          }
        </ul>

        <div class="nav-actions">
          <button
            class="theme-toggle"
            type="button"
            [attr.aria-label]="
              theme.theme() === 'dark' ? 'Activar tema claro' : 'Activar tema oscuro'
            "
            (click)="theme.toggle()"
          >
            <span class="theme-toggle-track">
              <span class="theme-toggle-dot">
                @if (theme.theme() === 'dark') {
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.7">
                    <path d="M12.5 9.5A5 5 0 0 1 6.5 3a5.5 5.5 0 1 0 6 6.5z" />
                  </svg>
                } @else {
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.7">
                    <circle cx="8" cy="8" r="3" />
                    <path
                      d="M8 1.5v2M8 12.5v2M1.5 8h2M12.5 8h2M3 3l1.4 1.4M11.6 11.6 13 13M13 3l-1.4 1.4M4.4 11.6 3 13"
                    />
                  </svg>
                }
              </span>
            </span>
          </button>
          <a class="nav-cta" routerLink="/contacto" (click)="menuOpen.set(false)">Contacto</a>
          <button
            class="nav-hamburger"
            type="button"
            aria-label="Abrir menú"
            (click)="menuOpen.set(!menuOpen())"
          >
            @if (menuOpen()) {
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            } @else {
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            }
          </button>
        </div>
      </div>
    </nav>

    <main class="public-main">
      <router-outlet />
    </main>

    <footer class="site-footer">
      <div class="footer-inner">
        <div class="footer-brand">
          <div class="footer-brand-name">Ivan Fibiger</div>
          <div class="footer-brand-sub">Systems & Software</div>
          <div class="footer-brand-desc">
            Construyo software pensando en el problema, no solo en la pantalla.
          </div>
        </div>

        <div>
          <div class="footer-col-title">Navegación</div>
          <ul class="footer-links">
            @for (item of footerNavItems; track item.path) {
              <li>
                <a [routerLink]="item.path">{{ item.label }}</a>
              </li>
            }
          </ul>
        </div>

        <div>
          <div class="footer-col-title">Stack del portfolio</div>
          <ul class="footer-links">
            <li><a href="https://angular.dev" target="_blank">Angular · Frontend</a></li>
            <li><a href="https://nestjs.com" target="_blank">NestJS · Backend</a></li>
            <li><a href="https://www.postgresql.org" target="_blank">PostgreSQL · DB</a></li>
            <li><a href="https://www.docker.com" target="_blank">Docker · Infra</a></li>
            <li><a href="https://jwt.io" target="_blank">JWT · Auth</a></li>
          </ul>
        </div>
      </div>

      <div class="footer-bottom">
        <span class="footer-copy">© 2026 Ivan Fibiger</span>
        <span class="footer-stack">
          construido con <span>Angular</span> · <span>NestJS</span> · <span>Docker</span>
        </span>
      </div>
    </footer>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PublicShellComponent {
  readonly theme = inject(ThemeService);
  readonly menuOpen = signal(false);

  readonly navItems = [
    { path: '/', label: 'Inicio' },
    { path: '/proyectos', label: 'Proyectos' },
    { path: '/bitacora', label: 'Bitácora técnica' },
    { path: '/laboratorio', label: 'Laboratorio' },
    { path: '/sobre-mi', label: 'Sobre mí' },
  ];

  readonly footerNavItems = [
    { path: '/', label: 'Inicio' },
    { path: '/proyectos', label: 'Proyectos' },
    { path: '/bitacora', label: 'Bitácora técnica' },
    { path: '/laboratorio', label: 'Laboratorio' },
    { path: '/sobre-mi', label: 'Sobre mí' },
    { path: '/como-esta-construido', label: 'Cómo está construido' },
  ];
}

import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AdminSettingsService, AdminHealthProbe } from '../../../core/services/admin-settings.service';
import { AuthService } from '../../../core/services/auth.service';
import { ThemeMode, ThemeService } from '../../../core/services/theme.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [DatePipe, RouterLink],
  template: `
    <header class="admin-page-header row-header">
      <div>
        <div class="admin-page-title">Configuración</div>
        <div class="admin-page-sub">Centro operativo del portfolio</div>
      </div>
      <button class="btn btn-ghost btn-sm" type="button" (click)="refreshHealth()">
        Rechequear sistema
      </button>
    </header>

    <section class="settings-hero surface-block">
      <div>
        <div class="settings-kicker mono">/admin/settings</div>
        <h1>Panel implementado para operar sin tocar código.</h1>
        <p>
          Estado del backend, entorno activo, sesión y preferencias visuales en una sola pantalla.
          Los cambios disponibles hoy se guardan localmente; los metadatos globales quedan listos para
          conectar a un endpoint persistente cuando se agregue ese módulo al API.
        </p>
      </div>
    </section>

    <section class="settings-grid">
      <article class="settings-card settings-card--accent">
        <div class="settings-card-head">
          <span class="settings-label mono">Sistema</span>
          <span class="settings-pill" [class.is-ok]="health()?.ok" [class.is-bad]="health() && !health()?.ok">
            {{ health()?.status ?? 'checking' }}
          </span>
        </div>
        @if (health(); as probe) {
          <strong>{{ probe.ok ? 'Backend disponible' : 'Backend sin respuesta' }}</strong>
          <p>{{ probe.details }}</p>
          <small class="mono">Último check: {{ probe.checkedAt | date: 'dd/MM/yyyy HH:mm:ss' }}</small>
        } @else {
          <strong>Chequeando backend…</strong>
          <p>Consultando endpoint de salud.</p>
        }
      </article>

      <article class="settings-card">
        <div class="settings-card-head">
          <span class="settings-label mono">Entorno</span>
          <span class="settings-pill">{{ runtime.production ? 'prod' : 'dev' }}</span>
        </div>
        <dl class="settings-kv">
          <div><dt>API</dt><dd>{{ runtime.apiBaseUrl }}</dd></div>
          <div><dt>Sitio</dt><dd>{{ runtime.siteUrl }}</dd></div>
          <div><dt>Mocks</dt><dd>{{ runtime.useMocks ? 'activos' : 'desactivados' }}</dd></div>
        </dl>
      </article>

      <article class="settings-card">
        <div class="settings-card-head">
          <span class="settings-label mono">Sesión</span>
          <span class="settings-pill" [class.is-ok]="auth.isLoggedIn()">{{ auth.isLoggedIn() ? 'activa' : 'cerrada' }}</span>
        </div>
        <strong>Acceso administrativo</strong>
        <p>La ruta está protegida por guard y el token se adjunta a las llamadas admin.</p>
        <button class="btn btn-ghost btn-sm" type="button" (click)="auth.logoutAndRedirect()">Cerrar sesión</button>
      </article>
    </section>

    <section class="settings-columns">
      <article class="surface-block settings-panel">
        <h2>Apariencia del panel</h2>
        <div class="theme-choice" role="group" aria-label="Tema visual">
          @for (mode of themeModes; track mode.value) {
            <button
              type="button"
              class="theme-card"
              [class.is-selected]="theme.theme() === mode.value"
              (click)="theme.setTheme(mode.value)"
            >
              <span class="theme-swatch" [class.light]="mode.value === 'light'"></span>
              <span>
                <strong>{{ mode.label }}</strong>
                <small>{{ mode.description }}</small>
              </span>
            </button>
          }
        </div>
      </article>

      <article class="surface-block settings-panel">
        <h2>Metadatos públicos</h2>
        <div class="settings-summary">
          <div>
            <span class="mono">canonical</span>
            <strong>{{ runtime.siteUrl }}</strong>
          </div>
          <div>
            <span class="mono">api mode</span>
            <strong>{{ runtime.useMocks ? 'offline mocks' : 'live backend' }}</strong>
          </div>
        </div>
        <p>
          Estos valores salen de environment y configuración del backend. Para editarlos desde la UI
          falta agregar persistencia de settings en API.
        </p>
      </article>
    </section>

    <section class="surface-block settings-panel">
      <h2>Accesos rápidos de operación</h2>
      <div class="settings-actions">
        <a routerLink="/admin/articles" class="settings-action"><span>Artículos</span><small>crear, editar, publicar</small></a>
        <a routerLink="/admin/projects" class="settings-action"><span>Proyectos</span><small>portfolio técnico</small></a>
        <a routerLink="/admin/lab" class="settings-action"><span>Laboratorio</span><small>experimentos visibles</small></a>
        <a routerLink="/admin/analytics" class="settings-action"><span>Analytics</span><small>tráfico no invasivo</small></a>
      </div>
    </section>
  `,
  styles: [
    `
      :host { display: block; }
      .settings-hero {
        margin-bottom: 18px;
        background: radial-gradient(circle at 88% 18%, var(--accent-dim), transparent 32%), linear-gradient(135deg, var(--surface), color-mix(in srgb, var(--surface2) 54%, transparent));
      }
      .settings-kicker, .settings-label, .settings-kv dt, .settings-summary span {
        color: var(--text-faint); font-family: var(--font-mono); font-size: 10.5px; text-transform: uppercase; letter-spacing: 0.1em;
      }
      .settings-kicker { color: var(--accent); margin-bottom: 10px; }
      .settings-hero h1 { max-width: 720px; margin: 0 0 10px; font-size: clamp(24px, 3vw, 38px); line-height: 1.05; }
      .settings-hero p, .settings-card p, .settings-panel p { max-width: 760px; color: var(--text-sec); font-size: 14px; line-height: 1.6; }
      .settings-grid, .settings-columns, .settings-actions, .theme-choice { display: grid; gap: 14px; }
      .settings-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); margin-bottom: 14px; }
      .settings-columns { grid-template-columns: 1.2fr 0.8fr; margin-bottom: 14px; }
      .settings-actions { grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 10px; }
      .theme-choice { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; }
      .settings-card, .theme-card, .settings-summary div, .settings-action {
        border: 1px solid var(--border); border-radius: var(--r-md); background: var(--surface); padding: 14px;
      }
      .settings-card { min-height: 190px; display: flex; flex-direction: column; gap: 12px; border-radius: var(--r-lg); padding: 18px; }
      .settings-card--accent, .theme-card.is-selected { border-color: var(--border-accent); box-shadow: inset 0 0 0 1px var(--border-accent); }
      .settings-card-head { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
      .settings-pill { border: 1px solid var(--border); border-radius: 999px; color: var(--text-muted); padding: 3px 9px; font-family: var(--font-mono); font-size: 10.5px; text-transform: uppercase; }
      .settings-pill.is-ok { color: var(--green); background: var(--green-dim); border-color: color-mix(in srgb, var(--green) 32%, transparent); }
      .settings-pill.is-bad { color: var(--red); background: color-mix(in srgb, var(--red) 10%, transparent); border-color: color-mix(in srgb, var(--red) 28%, transparent); }
      .settings-card strong { color: var(--text); font-size: 18px; line-height: 1.2; }
      .settings-card small { color: var(--text-faint); font-size: 11px; margin-top: auto; }
      .settings-kv { display: grid; gap: 10px; margin: 0; }
      .settings-kv dd, .settings-summary strong { margin: 0; color: var(--text-sec); font-size: 13px; overflow-wrap: anywhere; }
      .settings-panel h2 { text-transform: uppercase; }
      .theme-card { display: flex; gap: 12px; align-items: center; text-align: left; background: var(--bg); color: var(--text); cursor: pointer; }
      .theme-card strong, .settings-action span, .settings-summary span { display: block; }
      .theme-card small, .settings-action small { display: block; color: var(--text-faint); font-size: 12px; line-height: 1.4; }
      .theme-swatch { width: 38px; height: 38px; border-radius: 50%; flex: 0 0 auto; background: linear-gradient(135deg, #0d0d0a 50%, #45e0c8 50%); border: 1px solid var(--border2); }
      .theme-swatch.light { background: linear-gradient(135deg, #fafaf7 50%, #0f766e 50%); }
      .settings-summary { display: grid; gap: 10px; margin-bottom: 12px; }
      .settings-summary div, .settings-action { background: var(--bg); }
      .settings-action { text-decoration: none; transition: border-color 0.2s, transform 0.2s; }
      .settings-action:hover { border-color: var(--border-accent); transform: translateY(-1px); }
      .settings-action span { color: var(--text); font-weight: 600; margin-bottom: 3px; }
      @media (max-width: 1000px) { .settings-grid, .settings-columns { grid-template-columns: 1fr; } .settings-actions { grid-template-columns: repeat(2, 1fr); } }
      @media (max-width: 560px) { .theme-choice, .settings-actions { grid-template-columns: 1fr; } }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent {
  private readonly settings = inject(AdminSettingsService);

  readonly auth = inject(AuthService);
  readonly theme = inject(ThemeService);
  readonly runtime = this.settings.runtime;
  readonly health = signal<AdminHealthProbe | null>(null);
  readonly themeModes: Array<{ value: ThemeMode; label: string; description: string }> = [
    { value: 'dark', label: 'Oscuro técnico', description: 'Negro cálido + cian eléctrico.' },
    { value: 'light', label: 'Claro editorial', description: 'Papel frío + acento petróleo.' },
  ];

  constructor() {
    this.refreshHealth();
  }

  refreshHealth(): void {
    this.health.set(null);
    this.settings.checkHealth().subscribe((probe) => this.health.set(probe));
  }
}

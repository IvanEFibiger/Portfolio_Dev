import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <main class="login-page">
      <section class="login-panel">
        <div class="admin-logo-mark">IF</div>
        <div class="admin-login-title">Panel administrativo</div>
        <div class="admin-login-sub">ivan.fibiger · systems</div>

        <form [formGroup]="form" (ngSubmit)="submit()" style="width: 100%;">
          <div class="form-field">
            <label class="form-label" for="login-email">Correo electrónico</label>
            <input
              id="login-email"
              class="form-input"
              type="email"
              formControlName="email"
              placeholder="ivan@ejemplo.com"
            />
          </div>
          <div class="form-field">
            <label class="form-label" for="login-password">Contraseña</label>
            <input
              id="login-password"
              class="form-input"
              type="password"
              formControlName="password"
              placeholder="••••••••"
            />
          </div>
          @if (error()) {
            <p class="form-error">{{ error() }}</p>
          }
          <button class="form-submit" type="submit">Ingresar al panel</button>
        </form>

        <div class="login-footer-note">Acceso restringido · No hay registro público</div>
      </section>
    </main>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder);
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  readonly error = signal('');

  readonly form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  submit(): void {
    if (this.form.invalid) {
      this.error.set('Completa email y password.');
      return;
    }

    const { email, password } = this.form.getRawValue();
    this.auth.login(email, password).subscribe({
      next: () => void this.router.navigate(['/admin/dashboard']),
      error: () => this.error.set('No se pudo iniciar sesión.'),
    });
  }
}

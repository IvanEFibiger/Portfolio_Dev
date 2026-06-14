import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactService } from '../../../core/services/contact.service';
import { PageHeaderComponent } from '../../../shared/components/page-header.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, PageHeaderComponent],
  template: `
    <app-page-header
      eyebrow="Contacto"
      title="Hablemos de una solución técnica concreta"
      description="Si necesitás construir un sistema serio, integrar procesos o bajar una idea a una solución técnica concreta, podemos hablar."
    />
    <section class="section">
      <div class="container">
        <div class="contact-layout">
          <form class="contact-form" [formGroup]="form" (ngSubmit)="submit()">
            <div class="form-field">
              <label class="form-label" for="contact-name">Nombre</label>
              <input
                id="contact-name"
                class="form-input"
                type="text"
                formControlName="name"
                placeholder="Tu nombre"
              />
              @if (form.controls.name.invalid && submitted()) {
                <p class="form-error">El nombre es obligatorio (mínimo 2 caracteres).</p>
              }
            </div>
            <div class="form-field">
              <label class="form-label" for="contact-email">Email</label>
              <input
                id="contact-email"
                class="form-input"
                type="email"
                formControlName="email"
                placeholder="nombre@ejemplo.com"
              />
              @if (form.controls.email.invalid && submitted()) {
                <p class="form-error">Ingresá un correo electrónico válido.</p>
              }
            </div>
            <div class="form-field">
              <label class="form-label" for="contact-company">Empresa / institución</label>
              <input
                id="contact-company"
                class="form-input"
                type="text"
                formControlName="company"
                placeholder="Opcional"
              />
            </div>
            <div class="form-field">
              <label class="form-label" for="contact-subject">Asunto</label>
              <input
                id="contact-subject"
                class="form-input"
                type="text"
                formControlName="subject"
                placeholder="¿De qué se trata?"
              />
              @if (form.controls.subject.invalid && submitted()) {
                <p class="form-error">El asunto es obligatorio (mínimo 4 caracteres).</p>
              }
            </div>
            <div class="form-field">
              <label class="form-label" for="contact-message">Mensaje</label>
              <textarea
                id="contact-message"
                class="form-input"
                rows="6"
                formControlName="message"
                placeholder="Contame el contexto, el problema y qué necesitás resolver."
              ></textarea>
              @if (form.controls.message.invalid && submitted()) {
                <p class="form-error">El mensaje es obligatorio (mínimo 20 caracteres).</p>
              }
            </div>
            @if (error()) {
              <p class="form-error">{{ error() }}</p>
            }
            <button class="form-submit" type="submit" [disabled]="loading()">
              {{ loading() ? 'Enviando...' : 'Enviar mensaje' }}
            </button>
            @if (message()) {
              <p class="form-success">{{ message() }}</p>
            }
          </form>

          <aside class="contact-aside">
            <div class="contact-aside-title">Tipo de conversaciones que tienen sentido</div>
            <ul class="contact-aside-list">
              <li>Arquitectura inicial de un sistema.</li>
              <li>Integración entre procesos y APIs.</li>
              <li>Paneles administrativos y gestión interna.</li>
              <li>Seguridad aplicada desde el diseño.</li>
              <li>Documentación y orden técnico para evolucionar.</li>
            </ul>
          </aside>
        </div>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactComponent {
  private readonly fb = inject(FormBuilder);
  private readonly contact = inject(ContactService);
  readonly submitted = signal(false);
  readonly loading = signal(false);
  readonly message = signal('');
  readonly error = signal('');

  readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    company: [''],
    subject: ['', [Validators.required, Validators.minLength(4)]],
    message: ['', [Validators.required, Validators.minLength(20)]],
  });

  submit(): void {
    this.submitted.set(true);
    this.error.set('');
    this.message.set('');
    if (this.form.invalid) {
      return;
    }

    this.loading.set(true);
    this.contact.sendMessage(this.form.getRawValue()).subscribe({
      next: (response) => {
        this.loading.set(false);
        this.submitted.set(false);
        this.message.set(response.message);
        this.form.reset();
      },
      error: (err) => {
        this.loading.set(false);
        this.error.set(err.error?.message ?? 'Error al enviar el mensaje. Intentá más tarde.');
      },
    });
  }
}

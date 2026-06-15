import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminLabService } from '../../../core/services/admin-lab.service';
import { LabStatus } from '../../../shared/models/lab.model';
import { slugify } from '../../../shared/utils/slug.util';

@Component({
  selector: 'app-lab-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <header class="admin-page-header row-header">
      <div>
        <div class="admin-page-title">{{ labId() ? 'Editar lab' : 'Crear lab' }}</div>
        <div class="admin-page-sub">Items del laboratorio tecnico</div>
      </div>
    </header>
    <form class="admin-form" [formGroup]="form" (ngSubmit)="submit()">
      <div class="form-grid">
        <div class="form-field">
          <label class="form-label" for="lf-number">Numero</label>
          <input
            id="lf-number"
            class="form-input"
            formControlName="labNumber"
            placeholder="LAB-006"
          />
        </div>
        <div class="form-field">
          <label class="form-label" for="lf-order">Orden</label>
          <input id="lf-order" class="form-input" type="number" formControlName="sortOrder" />
        </div>
      </div>
      <div class="form-field">
        <label class="form-label" for="lf-title">Titulo</label>
        <input id="lf-title" class="form-input" formControlName="title" (blur)="syncSlug()" />
      </div>
      <div class="form-field">
        <label class="form-label" for="lf-slug">Slug</label>
        <input id="lf-slug" class="form-input" formControlName="slug" />
      </div>
      <div class="form-field">
        <label class="form-label" for="lf-description">Descripcion</label>
        <textarea
          id="lf-description"
          class="form-input"
          rows="3"
          formControlName="description"
        ></textarea>
      </div>
      <div class="form-grid">
        <div class="form-field">
          <label class="form-label" for="lf-status">Estado</label>
          <select id="lf-status" class="form-input" formControlName="status">
            <option value="Explorando">Explorando</option>
            <option value="En desarrollo">En desarrollo</option>
            <option value="Documentado">Documentado</option>
            <option value="Archivado">Archivado</option>
          </select>
        </div>
        <div class="form-field">
          <label class="form-label" for="lf-published">Visibilidad</label>
          <label class="form-checkbox">
            <input id="lf-published" type="checkbox" formControlName="published" />
            Visible en el sitio público
          </label>
        </div>
        <div class="form-field">
          <label class="form-label" for="lf-stack">Stack</label>
          <input
            id="lf-stack"
            class="form-input"
            formControlName="stack"
            placeholder="NestJS, PostgreSQL"
          />
        </div>
      </div>
      <div class="form-field">
        <label class="form-label" for="lf-learning">Aprendizaje</label>
        <textarea
          id="lf-learning"
          class="form-input"
          rows="3"
          formControlName="learning"
        ></textarea>
      </div>
      <button class="button button-primary" type="submit" [disabled]="saving()">
        {{ saving() ? 'Guardando...' : 'Guardar' }}
      </button>
      @if (error()) {
        <p class="form-error">{{ error() }}</p>
      }
      @if (message()) {
        <p class="form-success">{{ message() }}</p>
      }
    </form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LabFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly service = inject(AdminLabService);
  readonly labId = signal<string | null>(null);
  readonly saving = signal(false);
  readonly error = signal('');
  readonly message = signal('');

  readonly form = this.fb.nonNullable.group({
    labNumber: ['', Validators.required],
    title: ['', Validators.required],
    slug: ['', Validators.required],
    description: ['', Validators.required],
    status: this.fb.nonNullable.control<LabStatus>('Explorando'),
    stack: [''],
    learning: ['', Validators.required],
    sortOrder: [0],
    published: [false],
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.labId.set(id);
    if (!id) {
      return;
    }

    this.service.getLab(id).subscribe({
      next: (lab) => {
        if (!lab) return;
        this.form.patchValue({
          labNumber: lab.labNumber,
          title: lab.title,
          slug: lab.slug,
          description: lab.description,
          status: lab.status,
          stack: lab.stack.join(', '),
          learning: lab.learning,
          sortOrder: lab.sortOrder,
          published: lab.published,
        });
      },
      error: () => this.error.set('No se pudo cargar el lab.'),
    });
  }

  syncSlug(): void {
    if (!this.form.controls.slug.value) {
      this.form.controls.slug.setValue(slugify(this.form.controls.title.value));
    }
  }

  submit(): void {
    if (this.form.invalid) return;

    this.saving.set(true);
    this.error.set('');
    this.message.set('');

    this.service.saveLab(this.form.getRawValue(), this.labId() ?? undefined).subscribe({
      next: () => {
        this.message.set('Lab guardado.');
        void this.router.navigate(['/admin/lab']);
      },
      error: (err) => {
        this.saving.set(false);
        this.error.set(err.error?.message ?? 'Error al guardar el lab.');
      },
    });
  }
}

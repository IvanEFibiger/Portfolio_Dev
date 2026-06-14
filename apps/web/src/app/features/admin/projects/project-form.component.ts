import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminProjectsService } from '../../../core/services/admin-projects.service';
import { ProjectOperationalStatus, ProjectStatus } from '../../../shared/models/project.model';
import { slugify } from '../../../shared/utils/slug.util';

@Component({
  selector: 'app-project-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <header class="admin-page-header row-header">
      <div>
        <div class="admin-page-title">{{ projectId() ? 'Editar proyecto' : 'Crear proyecto' }}</div>
        <div class="admin-page-sub">Casos de estudio</div>
      </div>
    </header>
    <form class="admin-form" [formGroup]="form" (ngSubmit)="submit()">
      <div class="form-field">
        <label class="form-label" for="pf-title">Título</label>
        <input id="pf-title" class="form-input" formControlName="title" (blur)="syncSlug()" />
      </div>
      <div class="form-field">
        <label class="form-label" for="pf-slug">Slug</label>
        <input id="pf-slug" class="form-input" formControlName="slug" />
      </div>
      <div class="form-field">
        <label class="form-label" for="pf-summary">Resumen</label>
        <textarea id="pf-summary" class="form-input" rows="3" formControlName="summary"></textarea>
      </div>
      <div class="form-grid">
        <div class="form-field">
          <label class="form-label" for="pf-type">Tipo</label>
          <input
            id="pf-type"
            class="form-input"
            formControlName="type"
            placeholder="Plataforma municipal"
          />
        </div>
        <div class="form-field">
          <label class="form-label" for="pf-complexity">Complejidad</label>
          <input
            id="pf-complexity"
            class="form-input"
            formControlName="complexity"
            placeholder="Alta / Media / Baja"
          />
        </div>
      </div>
      <div class="form-grid">
        <div class="form-field">
          <label class="form-label" for="pf-operational-status">Estado operativo</label>
          <select id="pf-operational-status" class="form-input" formControlName="operationalStatus">
            <option value="active">Activo</option>
            <option value="dev">En desarrollo</option>
            <option value="wip">WIP</option>
          </select>
        </div>
        <div class="form-field">
          <label class="form-label" for="pf-role">Rol</label>
          <input id="pf-role" class="form-input" formControlName="role" />
        </div>
      </div>
      <div class="form-field">
        <label class="form-label" for="pf-context">Contexto</label>
        <textarea id="pf-context" class="form-input" rows="3" formControlName="context"></textarea>
      </div>
      <div class="form-field">
        <label class="form-label" for="pf-objective">Objetivo</label>
        <textarea
          id="pf-objective"
          class="form-input"
          rows="3"
          formControlName="objective"
        ></textarea>
      </div>
      <div class="form-field">
        <label class="form-label" for="pf-problem">Problema</label>
        <textarea id="pf-problem" class="form-input" rows="3" formControlName="problem"></textarea>
      </div>
      <div class="form-field">
        <label class="form-label" for="pf-solution">Solución</label>
        <textarea
          id="pf-solution"
          class="form-input"
          rows="3"
          formControlName="solution"
        ></textarea>
      </div>
      <div class="form-field">
        <label class="form-label" for="pf-architecture">Arquitectura</label>
        <textarea
          id="pf-architecture"
          class="form-input"
          rows="4"
          formControlName="architecture"
        ></textarea>
      </div>
      <div class="form-field">
        <label class="form-label" for="pf-result">Resultado</label>
        <textarea id="pf-result" class="form-input" rows="3" formControlName="result"></textarea>
      </div>
      <div class="form-field">
        <label class="form-label" for="pf-learnings">Aprendizajes</label>
        <textarea
          id="pf-learnings"
          class="form-input"
          rows="3"
          formControlName="learnings"
        ></textarea>
      </div>
      <div class="form-field">
        <label class="form-label" for="pf-improvements">Mejoras futuras</label>
        <textarea
          id="pf-improvements"
          class="form-input"
          rows="3"
          formControlName="improvements"
        ></textarea>
      </div>
      <div class="form-grid">
        <div class="form-field">
          <label class="form-label" for="pf-restrictions">Restricciones (una por línea)</label>
          <textarea
            id="pf-restrictions"
            class="form-input"
            rows="3"
            formControlName="restrictions"
          ></textarea>
        </div>
        <div class="form-field">
          <label class="form-label" for="pf-technical-decisions"
            >Decisiones técnicas (una por línea)</label
          >
          <textarea
            id="pf-technical-decisions"
            class="form-input"
            rows="3"
            formControlName="technicalDecisions"
          ></textarea>
        </div>
      </div>
      <div class="form-grid">
        <div class="form-field">
          <label class="form-label" for="pf-security">Seguridad (una por línea)</label>
          <textarea
            id="pf-security"
            class="form-input"
            rows="3"
            formControlName="security"
          ></textarea>
        </div>
        <div class="form-field">
          <label class="form-label" for="pf-highlights">Highlights (una por línea)</label>
          <textarea
            id="pf-highlights"
            class="form-input"
            rows="3"
            formControlName="highlights"
          ></textarea>
        </div>
      </div>
      <div class="form-grid">
        <div class="form-field">
          <label class="form-label" for="pf-stack">Stack</label>
          <input
            id="pf-stack"
            class="form-input"
            formControlName="stack"
            placeholder="Angular, NestJS"
          />
        </div>
        <div class="form-field">
          <label class="form-label" for="pf-status">Estado</label>
          <select id="pf-status" class="form-input" formControlName="status">
            <option value="draft">Borrador</option>
            <option value="published">Publicado</option>
            <option value="archived">Archivado</option>
          </select>
        </div>
      </div>
      <div class="form-grid">
        <div class="form-field">
          <label class="form-label" for="pf-order">Orden</label>
          <input id="pf-order" class="form-input" type="number" formControlName="sortOrder" />
        </div>
        <label class="checkbox-label" style="margin-top: 22px;">
          <input type="checkbox" formControlName="featured" /> Destacado
        </label>
      </div>
      <div class="form-grid">
        <div class="form-field">
          <label class="form-label" for="pf-repo">Repositorio</label>
          <input
            id="pf-repo"
            class="form-input"
            formControlName="repositoryUrl"
            placeholder="https://github.com/..."
          />
        </div>
        <div class="form-field">
          <label class="form-label" for="pf-demo">Demo</label>
          <input
            id="pf-demo"
            class="form-input"
            formControlName="demoUrl"
            placeholder="https://demo.example.com"
          />
        </div>
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
export class ProjectFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly service = inject(AdminProjectsService);
  readonly projectId = signal<string | null>(null);
  readonly saving = signal(false);
  readonly error = signal('');
  readonly message = signal('');

  readonly form = this.fb.nonNullable.group({
    title: ['', Validators.required],
    slug: ['', Validators.required],
    summary: ['', Validators.required],
    problem: ['', Validators.required],
    solution: ['', Validators.required],
    architecture: ['', Validators.required],
    stack: [''],
    status: this.fb.nonNullable.control<ProjectStatus>('draft'),
    featured: [false],
    sortOrder: [0],
    repositoryUrl: [''],
    demoUrl: [''],
    type: [''],
    operationalStatus: this.fb.nonNullable.control<ProjectOperationalStatus>('active'),
    complexity: [''],
    context: [''],
    objective: [''],
    restrictions: [''],
    technicalDecisions: [''],
    security: [''],
    result: [''],
    learnings: [''],
    improvements: [''],
    highlights: [''],
    role: [''],
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.projectId.set(id);
    if (!id) {
      return;
    }

    this.service.getProject(id).subscribe({
      next: (project) => {
        if (!project) {
          return;
        }
        this.form.patchValue({
          title: project.title,
          slug: project.slug,
          summary: project.summary,
          problem: project.problem,
          solution: project.solution,
          architecture: project.architecture,
          stack: project.stack.join(', '),
          status: project.status,
          featured: project.featured,
          sortOrder: project.sortOrder,
          repositoryUrl: project.repositoryUrl ?? '',
          demoUrl: project.demoUrl ?? '',
          type: project.type ?? '',
          operationalStatus: project.operationalStatus ?? 'active',
          complexity: project.complexity ?? '',
          context: project.context ?? '',
          objective: project.objective ?? '',
          restrictions: project.restrictions.join('\n'),
          technicalDecisions: project.technicalDecisions.join('\n'),
          security: project.security.join('\n'),
          result: project.result ?? '',
          learnings: project.learnings ?? '',
          improvements: project.improvements ?? '',
          highlights: (project.highlights ?? []).join('\n'),
          role: project.role ?? '',
        });
      },
      error: () => this.error.set('No se pudo cargar el proyecto.'),
    });
  }

  syncSlug(): void {
    if (!this.form.controls.slug.value) {
      this.form.controls.slug.setValue(slugify(this.form.controls.title.value));
    }
  }

  submit(): void {
    if (this.form.invalid) {
      return;
    }

    this.saving.set(true);
    this.error.set('');
    this.message.set('');

    this.service.saveProject(this.form.getRawValue(), this.projectId() ?? undefined).subscribe({
      next: () => {
        this.message.set('Proyecto guardado.');
        void this.router.navigate(['/admin/projects']);
      },
      error: (err) => {
        this.saving.set(false);
        this.error.set(err.error?.message ?? 'Error al guardar el proyecto.');
      },
    });
  }
}

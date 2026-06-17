import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminArticlesService } from '../../../core/services/admin-articles.service';
import { ArticleStatus } from '../../../shared/models/article.model';
import { ArticleContentBlock } from '../../../shared/models/content-block.model';
import { slugify } from '../../../shared/utils/slug.util';
import { BlockEditorComponent } from '../../../shared/components/block-editor/block-editor.component';

@Component({
  selector: 'app-article-form',
  standalone: true,
  imports: [ReactiveFormsModule, BlockEditorComponent],
  template: `
    <header class="admin-page-header row-header">
      <div>
        <div class="admin-page-title">{{ articleId() ? 'Editar artículo' : 'Crear artículo' }}</div>
        <div class="admin-page-sub">Bitácora del programador</div>
      </div>
    </header>
    <form class="admin-form" [formGroup]="form" (ngSubmit)="submit()">
      <div class="form-field">
        <label class="form-label" for="af-title">Título</label>
        <input id="af-title" class="form-input" formControlName="title" (blur)="syncSlug()" />
      </div>
      <div class="form-field">
        <label class="form-label" for="af-slug">Slug</label>
        <input id="af-slug" class="form-input" formControlName="slug" />
      </div>
      <div class="form-field">
        <label class="form-label" for="af-excerpt">Extracto</label>
        <textarea id="af-excerpt" class="form-input" rows="3" formControlName="excerpt"></textarea>
      </div>
      <div class="form-grid">
        <div class="form-field">
          <label class="form-label" for="af-category">Categoría</label>
          <input id="af-category" class="form-input" formControlName="category" />
        </div>
        <div class="form-field">
          <label class="form-label" for="af-tags">Tags</label>
          <input
            id="af-tags"
            class="form-input"
            formControlName="tags"
            placeholder="Angular, NestJS"
          />
        </div>
      </div>
      <div class="form-grid">
        <div class="form-field">
          <label class="form-label" for="af-seo-title">SEO title</label>
          <input id="af-seo-title" class="form-input" formControlName="seoTitle" />
        </div>
        <div class="form-field">
          <label class="form-label" for="af-status">Estado</label>
          <select id="af-status" class="form-input" formControlName="status">
            <option value="draft">Borrador</option>
            <option value="published">Publicado</option>
            <option value="archived">Archivado</option>
          </select>
        </div>
      </div>
      <div class="form-field">
        <label class="form-label" for="af-seo-desc">SEO description</label>
        <textarea
          id="af-seo-desc"
          class="form-input"
          rows="2"
          formControlName="seoDescription"
        ></textarea>
      </div>
      <app-block-editor [(blocks)]="blocks" />
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
export class ArticleFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly service = inject(AdminArticlesService);
  readonly articleId = signal<string | null>(null);
  readonly saving = signal(false);
  readonly error = signal('');
  readonly message = signal('');
  readonly blocks = signal<ArticleContentBlock[]>([{ type: 'paragraph', text: '' }]);

  readonly form = this.fb.nonNullable.group({
    title: ['', Validators.required],
    slug: ['', Validators.required],
    excerpt: ['', Validators.required],
    category: ['Arquitectura', Validators.required],
    tags: [''],
    seoTitle: [''],
    seoDescription: [''],
    status: this.fb.nonNullable.control<ArticleStatus>('draft'),
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.articleId.set(id);
    if (!id) {
      return;
    }

    this.service.getArticle(id).subscribe({
      next: (article) => {
        if (!article) {
          return;
        }
        this.form.patchValue({
          title: article.title,
          slug: article.slug,
          excerpt: article.excerpt,
          category: article.category,
          tags: article.tags.join(', '),
          seoTitle: article.seoTitle ?? '',
          seoDescription: article.seoDescription ?? '',
          status: article.status,
        });
        this.blocks.set(
          article.content.blocks.length > 0
            ? article.content.blocks
            : [{ type: 'paragraph', text: '' }],
        );
      },
      error: () => this.error.set('No se pudo cargar el artículo.'),
    });
  }

  syncSlug(): void {
    if (!this.form.controls.slug.value) {
      this.form.controls.slug.setValue(slugify(this.form.controls.title.value));
    }
  }

  submit(): void {
    if (this.form.invalid || this.blocks().length === 0) {
      if (this.blocks().length === 0) {
        this.error.set('Agrega al menos un bloque de contenido.');
      }
      return;
    }

    this.saving.set(true);
    this.error.set('');
    this.message.set('');

    this.service
      .saveArticle(
        { ...this.form.getRawValue(), blocks: this.blocks() },
        this.articleId() ?? undefined,
      )
      .subscribe({
        next: () => {
          this.message.set('Artículo guardado.');
          void this.router.navigate(['/admin/articles']);
        },
        error: (err) => {
          this.saving.set(false);
          this.error.set(err.error?.message ?? 'Error al guardar el artículo.');
        },
      });
  }
}

import { ChangeDetectionStrategy, Component, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ContentBlockRendererComponent } from '../content-block-renderer.component';
import { ArticleContentBlock } from '../../models/content-block.model';

type BlockType = ArticleContentBlock['type'];

@Component({
  selector: 'app-block-editor',
  standalone: true,
  imports: [FormsModule, ContentBlockRendererComponent],
  template: `
    <div class="block-editor">
      <div class="block-editor-toolbar">
        <span class="block-editor-title">Editor de bloques</span>
        <div class="block-editor-actions">
          @for (type of blockTypes; track type) {
            <button class="button button-ghost block-add" type="button" (click)="addBlock(type)">
              + {{ labels[type] }}
            </button>
          }
        </div>
      </div>

      @if (blocks().length === 0) {
        <div class="block-empty">Agrega al menos un bloque para construir el articulo.</div>
      }

      <div class="block-list">
        @for (block of blocks(); track $index; let i = $index) {
          <article class="block-editor-card">
            <header class="block-card-header">
              <div class="block-card-title">
                <span class="mono">#{{ i + 1 }}</span>
                <select
                  class="form-input block-type-select"
                  [ngModel]="block.type"
                  (ngModelChange)="changeType(i, $event)"
                >
                  @for (type of blockTypes; track type) {
                    <option [value]="type">{{ labels[type] }}</option>
                  }
                </select>
              </div>
              <div class="block-card-actions">
                <button
                  class="button button-ghost"
                  type="button"
                  (click)="moveBlock(i, -1)"
                  [disabled]="i === 0"
                >
                  Subir
                </button>
                <button
                  class="button button-ghost"
                  type="button"
                  (click)="moveBlock(i, 1)"
                  [disabled]="i === blocks().length - 1"
                >
                  Bajar
                </button>
                <button class="button button-ghost del" type="button" (click)="removeBlock(i)">
                  Eliminar
                </button>
              </div>
            </header>

            @switch (block.type) {
              @case ('paragraph') {
                <textarea
                  class="form-input"
                  rows="4"
                  [(ngModel)]="block.text"
                  placeholder="Parrafo"
                ></textarea>
              }
              @case ('heading') {
                <div class="form-grid">
                  <div class="form-field">
                    <label class="form-label">Nivel</label>
                    <select class="form-input" [(ngModel)]="block.level">
                      <option [ngValue]="2">H2</option>
                      <option [ngValue]="3">H3</option>
                      <option [ngValue]="4">H4</option>
                    </select>
                  </div>
                  <div class="form-field">
                    <label class="form-label">Texto</label>
                    <input
                      class="form-input"
                      [(ngModel)]="block.text"
                      placeholder="Titulo de seccion"
                    />
                  </div>
                </div>
              }
              @case ('code') {
                <div class="form-field">
                  <label class="form-label">Lenguaje</label>
                  <input class="form-input" [(ngModel)]="block.language" placeholder="typescript" />
                </div>
                <textarea
                  class="form-input mono"
                  rows="7"
                  [(ngModel)]="block.code"
                  placeholder="Codigo"
                ></textarea>
              }
              @case ('quote') {
                <textarea
                  class="form-input"
                  rows="3"
                  [(ngModel)]="block.text"
                  placeholder="Cita"
                ></textarea>
              }
              @case ('callout') {
                <div class="form-grid">
                  <div class="form-field">
                    <label class="form-label">Variante</label>
                    <select class="form-input" [(ngModel)]="block.variant">
                      <option value="info">Info</option>
                      <option value="warning">Warning</option>
                      <option value="danger">Danger</option>
                      <option value="success">Success</option>
                    </select>
                  </div>
                  <div class="form-field">
                    <label class="form-label">Titulo opcional</label>
                    <input
                      class="form-input"
                      [(ngModel)]="block.title"
                      placeholder="Nota tecnica"
                    />
                  </div>
                </div>
                <textarea
                  class="form-input"
                  rows="3"
                  [(ngModel)]="block.text"
                  placeholder="Contenido del callout"
                ></textarea>
              }
              @case ('image') {
                <div class="form-grid">
                  <div class="form-field">
                    <label class="form-label">URL</label>
                    <input class="form-input" [(ngModel)]="block.url" placeholder="https://..." />
                  </div>
                  <div class="form-field">
                    <label class="form-label">Alt</label>
                    <input
                      class="form-input"
                      [(ngModel)]="block.alt"
                      placeholder="Descripcion accesible"
                    />
                  </div>
                </div>
              }
              @case ('list') {
                <label class="checkbox-label">
                  <input type="checkbox" [(ngModel)]="block.ordered" /> Lista ordenada
                </label>
                <textarea
                  class="form-input"
                  rows="5"
                  [ngModel]="
                    block.items.join(
                      '
'
                    )
                  "
                  (ngModelChange)="updateListItems(i, $event)"
                  placeholder="Un item por linea"
                ></textarea>
              }
            }
          </article>
        }
      </div>

      @if (blocks().length > 0) {
        <section class="block-preview">
          <div class="block-preview-title">Preview</div>
          <app-content-block-renderer [blocks]="blocks()" />
        </section>
      }
    </div>
  `,
  styles: [
    `
      .block-editor {
        display: grid;
        gap: 18px;
      }
      .block-editor-toolbar,
      .block-card-header {
        display: flex;
        justify-content: space-between;
        gap: 14px;
        align-items: flex-start;
      }
      .block-editor-title,
      .block-preview-title {
        font-weight: 700;
        color: var(--text-main);
      }
      .block-editor-actions,
      .block-card-actions,
      .block-card-title {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
        align-items: center;
      }
      .block-add {
        padding: 7px 10px;
        font-size: 12px;
      }
      .block-empty,
      .block-editor-card,
      .block-preview {
        border: 1px solid var(--border);
        background: var(--surface);
        border-radius: 18px;
      }
      .block-empty {
        padding: 18px;
        color: var(--text-muted);
      }
      .block-list {
        display: grid;
        gap: 14px;
      }
      .block-editor-card {
        padding: 16px;
        display: grid;
        gap: 14px;
      }
      .block-type-select {
        width: auto;
        min-width: 150px;
      }
      .del {
        color: #fb7185;
      }
      .block-preview {
        padding: 18px;
        display: grid;
        gap: 12px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlockEditorComponent {
  readonly blocks = model<ArticleContentBlock[]>([]);
  readonly blockTypes: BlockType[] = [
    'paragraph',
    'heading',
    'code',
    'quote',
    'callout',
    'image',
    'list',
  ];
  readonly labels: Record<BlockType, string> = {
    paragraph: 'Parrafo',
    heading: 'Heading',
    code: 'Codigo',
    quote: 'Quote',
    callout: 'Callout',
    image: 'Imagen',
    list: 'Lista',
  };

  addBlock(type: BlockType): void {
    this.blocks.update((blocks) => [...blocks, this.createBlock(type)]);
  }

  removeBlock(index: number): void {
    this.blocks.update((blocks) => blocks.filter((_, i) => i !== index));
  }

  moveBlock(index: number, direction: -1 | 1): void {
    const target = index + direction;
    const current = this.blocks();
    if (target < 0 || target >= current.length) return;
    const next = [...current];
    [next[index], next[target]] = [next[target], next[index]];
    this.blocks.set(next);
  }

  changeType(index: number, type: BlockType): void {
    this.blocks.update((blocks) =>
      blocks.map((block, i) => (i === index ? this.createBlock(type, block) : block)),
    );
  }

  updateListItems(index: number, value: string): void {
    const items = value
      .split('\n')
      .map((item) => item.trim())
      .filter(Boolean);
    this.blocks.update((blocks) =>
      blocks.map((block, i) => {
        if (i !== index || block.type !== 'list') return block;
        return { ...block, items };
      }),
    );
  }

  private createBlock(type: BlockType, previous?: ArticleContentBlock): ArticleContentBlock {
    const text = previous && 'text' in previous ? previous.text : '';
    switch (type) {
      case 'paragraph':
        return { type, text };
      case 'heading':
        return { type, level: 2, text };
      case 'code':
        return {
          type,
          language: 'typescript',
          code: previous?.type === 'code' ? previous.code : '',
        };
      case 'quote':
        return { type, text };
      case 'callout':
        return { type, variant: 'info', title: '', text };
      case 'image':
        return {
          type,
          url: previous?.type === 'image' ? previous.url : '',
          alt: previous?.type === 'image' ? previous.alt : '',
        };
      case 'list':
        return { type, ordered: false, items: previous?.type === 'list' ? previous.items : [] };
    }
  }
}

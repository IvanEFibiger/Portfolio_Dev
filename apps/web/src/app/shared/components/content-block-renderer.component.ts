import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ArticleContentBlock } from '../models/content-block.model';

@Component({
  selector: 'app-content-block-renderer',
  standalone: true,
  template: `
    <div class="content-block">
      @for (block of blocks(); track $index) {
        @switch (block.type) {
          @case ('paragraph') {
            <p>{{ block.text }}</p>
          }
          @case ('heading') {
            @if (block.level === 2) {
              <h2>{{ block.text }}</h2>
            } @else if (block.level === 3) {
              <h3>{{ block.text }}</h3>
            } @else {
              <h4>{{ block.text }}</h4>
            }
          }
          @case ('code') {
            <pre><code>{{ block.code }}</code></pre>
          }
          @case ('quote') {
            <blockquote>{{ block.text }}</blockquote>
          }
          @case ('callout') {
            <aside class="callout" [class]="'callout callout-' + block.variant">
              @if (block.title) {
                <strong>{{ block.title }}</strong>
              }
              <p>{{ block.text }}</p>
            </aside>
          }
          @case ('image') {
            <figure class="content-image-frame">
              <img
                [ngSrc]="block.url"
                [alt]="block.alt"
                fill
                loading="lazy"
                decoding="async"
                sizes="(max-width: 800px) 100vw, 800px"
              />
            </figure>
          }
          @case ('list') {
            @if (block.ordered) {
              <ol>
                @for (item of block.items; track item) {
                  <li>{{ item }}</li>
                }
              </ol>
            } @else {
              <ul>
                @for (item of block.items; track item) {
                  <li>{{ item }}</li>
                }
              </ul>
            }
          }
        }
      }
    </div>
  `,
  imports: [NgOptimizedImage],
  styles: [
    `
      .content-image-frame {
        position: relative;
        width: 100%;
        aspect-ratio: 16 / 9;
        overflow: hidden;
        border-radius: var(--r-md);
      }

      .content-image-frame img {
        object-fit: cover;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentBlockRendererComponent {
  readonly blocks = input.required<ArticleContentBlock[]>();
}

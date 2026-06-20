import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
  inject,
  input,
  signal,
} from '@angular/core';
import { catchError, of } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ArticleReactionsService } from '../../core/services/article-reactions.service';
import { ArticleReactions, ArticleReactionType } from '../models/article-reaction.model';

const EMPTY_REACTIONS: ArticleReactions = {
  counts: { like: 0, fire: 0 },
  total: 0,
  viewerReaction: null,
};

@Component({
  selector: 'app-article-reactions',
  standalone: true,
  template: `
    <aside class="article-reactions" aria-label="Feedback del articulo">
      <div class="article-reactions-copy">
        <span class="mono">feedback.signal</span>
        <strong>Te sirvio esta nota?</strong>
        <p>Un gesto minimo me ayuda a saber que vale la pena seguir escribiendo.</p>
      </div>

      <div class="reaction-actions">
        <button
          type="button"
          class="reaction-button"
          [class.is-active]="reactions().viewerReaction === 'like'"
          [disabled]="isSaving()"
          (click)="react('like')"
        >
          <span class="reaction-emoji" aria-hidden="true">&#128077;</span>
          <span class="reaction-label">Util</span>
          <span class="reaction-count mono">{{ reactions().counts.like }}</span>
        </button>

        <button
          type="button"
          class="reaction-button reaction-button--fire"
          [class.is-active]="reactions().viewerReaction === 'fire'"
          [disabled]="isSaving()"
          (click)="react('fire')"
        >
          <span class="reaction-emoji" aria-hidden="true">&#128293;</span>
          <span class="reaction-label">Me sirvio</span>
          <span class="reaction-count mono">{{ reactions().counts.fire }}</span>
        </button>
      </div>
    </aside>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleReactionsComponent implements OnInit {
  private readonly reactionsService = inject(ArticleReactionsService);
  private readonly destroyRef = inject(DestroyRef);

  readonly slug = input.required<string>();
  readonly reactions = signal<ArticleReactions>(EMPTY_REACTIONS);
  readonly isSaving = signal(false);

  ngOnInit(): void {
    this.reactionsService
      .getReactions(this.slug())
      .pipe(
        catchError(() => of(EMPTY_REACTIONS)),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((reactions) => this.reactions.set(reactions));
  }

  react(reactionType: ArticleReactionType): void {
    if (this.isSaving()) return;

    this.isSaving.set(true);
    this.reactionsService
      .react(this.slug(), reactionType)
      .pipe(
        catchError(() => of(this.reactions())),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((reactions) => {
        this.reactions.set(reactions);
        this.isSaving.set(false);
      });
  }
}

import { AsyncPipe, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AdminNewsletterService } from '../../../core/services/admin-newsletter.service';

@Component({
  selector: 'app-newsletter',
  standalone: true,
  imports: [AsyncPipe, DatePipe],
  template: `
    <header class="admin-page-header row-header">
      <div>
        <div class="admin-page-title">Suscriptores</div>
        <div class="admin-page-sub">Lista técnica del portfolio</div>
      </div>
    </header>
    @if (subscribers$ | async; as subscribers) {
      <div class="admin-table-wrap">
        <div class="admin-table-header">
          Suscriptores
          <span class="mono" style="font-size: 10.5px; color: var(--text-faint);"
            >{{ subscribers.length }} total</span
          >
        </div>
        <table class="admin-table">
          <thead>
            <tr>
              <th>Email</th>
              <th>Estado</th>
              <th>Fecha de alta</th>
            </tr>
          </thead>
          <tbody>
            @for (subscriber of subscribers; track subscriber.id) {
              <tr>
                <td class="td-title">{{ subscriber.email }}</td>
                <td>
                  @switch (subscriber.status) {
                    @case ('confirmed') {
                      <span class="badge-pub">Confirmado</span>
                    }
                    @case ('pending') {
                      <span class="badge-draft">Pendiente</span>
                    }
                    @default {
                      <span class="badge-arch">Cancelado</span>
                    }
                  }
                </td>
                <td>
                  <span class="mono" style="font-size: 10.5px; color: var(--text-faint);">{{
                    subscriber.subscribedAt | date: 'dd MMM yyyy'
                  }}</span>
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewsletterComponent {
  readonly subscribers$ = inject(AdminNewsletterService).getSubscribers();
}

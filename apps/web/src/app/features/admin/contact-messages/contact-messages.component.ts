import { AsyncPipe, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { AdminContactMessagesService } from '../../../core/services/admin-contact-messages.service';
import { ContactMessage } from '../../../shared/models/contact.model';

@Component({
  selector: 'app-contact-messages',
  standalone: true,
  imports: [AsyncPipe, DatePipe],
  template: `
    <header class="admin-page-header row-header">
      <div>
        <div class="admin-page-title">Mensajes recibidos</div>
        <div class="admin-page-sub">Contacto desde el portfolio</div>
      </div>
    </header>
    @if (messages$ | async; as messages) {
      <div class="admin-table-wrap">
        <div class="admin-table-header">
          Mensajes
          <span class="mono" style="font-size: 10.5px; color: var(--text-faint);"
            >{{ messages.length }} total</span
          >
        </div>
        <table class="admin-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>Asunto</th>
              <th>Estado</th>
              <th>Fecha</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            @for (message of messages; track message.id) {
              <tr>
                <td class="td-title">{{ message.name }}</td>
                <td>
                  <span
                    style="font-family: var(--mono); font-size: 11px; color: var(--text-faint);"
                    >{{ message.email }}</span
                  >
                </td>
                <td>{{ message.subject }}</td>
                <td>
                  @switch (message.status) {
                    @case ('new') {
                      <span class="badge-draft">Nuevo</span>
                    }
                    @case ('read') {
                      <span class="badge-pub">Leído</span>
                    }
                    @case ('answered') {
                      <span class="badge-pub">Respondido</span>
                    }
                    @default {
                      <span class="badge-arch">Descartado</span>
                    }
                  }
                </td>
                <td>
                  <span class="mono" style="font-size: 10.5px; color: var(--text-faint);">{{
                    message.createdAt | date: 'dd MMM yyyy'
                  }}</span>
                </td>
                <td>
                  <div class="td-actions">
                    <a
                      href="javascript:void(0)"
                      (click)="toggleExpand(message); $event.preventDefault()"
                    >
                      {{ isExpanded(message.id) ? 'ocultar' : 'ver' }}
                    </a>
                    <a
                      href="javascript:void(0)"
                      (click)="setRead(message.id); $event.preventDefault()"
                      >leído</a
                    >
                    <a
                      href="javascript:void(0)"
                      (click)="setAnswered(message.id); $event.preventDefault()"
                      >respondido</a
                    >
                    <a
                      href="javascript:void(0)"
                      class="del"
                      (click)="setDiscarded(message.id); $event.preventDefault()"
                      >descartar</a
                    >
                  </div>
                </td>
              </tr>
              @if (isExpanded(message.id)) {
                <tr class="message-detail-row">
                  <td colspan="6">
                    <div class="message-detail">
                      <div class="message-detail-meta">
                        @if (message.company) {
                          <span><strong>Empresa:</strong> {{ message.company }}</span>
                        }
                        <span><strong>Email:</strong> {{ message.email }}</span>
                      </div>
                      <div class="message-detail-body">
                        <strong>Mensaje:</strong>
                        <p style="margin: 8px 0 0; white-space: pre-wrap; line-height: 1.6;">
                          {{ message.message }}
                        </p>
                      </div>
                    </div>
                  </td>
                </tr>
              }
            }
          </tbody>
        </table>
      </div>
    }
  `,
  styles: [
    `
      .message-detail-row {
        background: var(--bg-1);
      }
      .message-detail {
        padding: 16px 20px;
      }
      .message-detail-meta {
        display: flex;
        gap: 24px;
        margin-bottom: 12px;
        font-size: 13px;
        color: var(--text-faint);
      }
      .message-detail-body {
        font-size: 14px;
        line-height: 1.6;
        color: var(--text);
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactMessagesComponent {
  private readonly service = inject(AdminContactMessagesService);
  readonly messages$ = this.service.getMessages();
  readonly expandedId = signal<string | null>(null);

  isExpanded(id: string): boolean {
    return this.expandedId() === id;
  }

  toggleExpand(message: ContactMessage): void {
    const current = this.expandedId();
    this.expandedId.set(current === message.id ? null : message.id);
  }

  setRead(id: string): void {
    this.service.updateStatus(id, 'read').subscribe();
  }

  setAnswered(id: string): void {
    this.service.updateStatus(id, 'answered').subscribe();
  }

  setDiscarded(id: string): void {
    this.service.updateStatus(id, 'discarded').subscribe();
  }
}

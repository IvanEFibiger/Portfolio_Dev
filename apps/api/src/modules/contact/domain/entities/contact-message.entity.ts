export type ContactMessageStatus = 'new' | 'read' | 'answered' | 'discarded';

export class ContactMessage {
  constructor(
    public readonly id: string,
    public name: string,
    public email: string,
    public company: string | null,
    public subject: string | null,
    public message: string,
    public status: ContactMessageStatus,
    public source: string | null,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}

  markAsRead(): void {
    this.status = 'read';
  }

  markAsAnswered(): void {
    this.status = 'answered';
  }

  discard(): void {
    this.status = 'discarded';
  }
}

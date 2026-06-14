export type ContactMessageStatus = 'new' | 'read' | 'answered' | 'discarded';

export interface ContactPayload {
  name: string;
  email: string;
  company?: string;
  subject?: string;
  message: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  company: string | null;
  subject: string;
  message: string;
  status: ContactMessageStatus;
  createdAt: string;
}

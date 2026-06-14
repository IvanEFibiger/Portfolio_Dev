export type NewsletterStatus = 'pending' | 'confirmed' | 'unsubscribed';

export interface NewsletterSubscriber {
  id: string;
  email: string;
  status: NewsletterStatus;
  subscribedAt: string;
}

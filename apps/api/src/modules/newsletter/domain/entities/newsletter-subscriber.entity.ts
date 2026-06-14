export type SubscriberStatus = 'pending' | 'confirmed' | 'unsubscribed';

export class NewsletterSubscriber {
  constructor(
    public readonly id: string,
    public email: string,
    public status: SubscriberStatus,
    public confirmationToken: string | null,
    public subscribedAt: Date | null,
    public unsubscribedAt: Date | null,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}

  confirm(): void {
    this.status = 'confirmed';
    this.confirmationToken = null;
    this.subscribedAt = new Date();
  }

  unsubscribe(): void {
    this.status = 'unsubscribed';
    this.unsubscribedAt = new Date();
  }
}

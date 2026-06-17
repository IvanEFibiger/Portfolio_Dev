export type AnalyticsEventType = 'page_view' | 'project_view' | 'article_view' | 'contact_submit';

export class AnalyticsEvent {
  constructor(
    public readonly id: string,
    public path: string,
    public eventType: AnalyticsEventType,
    public referrer: string | null,
    public userAgentHash: string | null,
    public visitorHash: string | null,
    public isOwner: boolean,
    public createdAt: Date,
  ) {}
}

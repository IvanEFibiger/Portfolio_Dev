export interface AnalyticsSummary {
  totalPageViews: number;
  recentVisits: Array<{ path: string; createdAt: string; referrer?: string }>;
  topPages: Array<{ path: string; views: number }>;
  topArticles: Array<{ title: string; views: number }>;
  topProjects: Array<{ title: string; views: number }>;
}

export interface AdminMetric {
  label: string;
  value: number;
  hint: string;
}

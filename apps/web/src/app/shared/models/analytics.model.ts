export interface AnalyticsSummary {
  totalPageViews: number;
  topPages: Array<{ path: string; views: number }>;
  viewsByDate: Array<{ date: string; views: number }>;
  recentVisits: Array<{ path: string; createdAt: string; referrer?: string }>;
  topArticles: Array<{ title: string; views: number }>;
  topProjects: Array<{ title: string; views: number }>;
}

export interface AdminMetric {
  label: string;
  value: number;
  hint: string;
}

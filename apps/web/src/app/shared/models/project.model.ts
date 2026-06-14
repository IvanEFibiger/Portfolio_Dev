export type ProjectStatus = 'draft' | 'published' | 'archived';
export type ProjectOperationalStatus = 'active' | 'dev' | 'wip';

export interface ProjectSummary {
  id: string;
  slug: string;
  title: string;
  type: string;
  summary: string;
  problem: string;
  stack: string[];
  status: ProjectStatus;
  operationalStatus: ProjectOperationalStatus;
  complexity: string;
  featured: boolean;
  coverImageUrl?: string | null;
  sortOrder: number;
  highlights?: string[];
}

export interface ProjectDetail extends ProjectSummary {
  context: string;
  objective: string;
  restrictions: string[];
  solution: string;
  role?: string;
  architecture: string;
  technicalDecisions: string[];
  security: string[];
  result: string;
  learnings: string;
  improvements: string;
  repositoryUrl?: string;
  demoUrl?: string;
}

export interface ProjectFormValue {
  title: string;
  slug: string;
  summary: string;
  problem: string;
  solution: string;
  architecture: string;
  stack: string;
  status: ProjectStatus;
  featured: boolean;
  sortOrder: number;
  repositoryUrl: string;
  demoUrl: string;
  type: string;
  operationalStatus: ProjectOperationalStatus;
  complexity: string;
  context: string;
  objective: string;
  restrictions: string;
  role: string;
  technicalDecisions: string;
  security: string;
  result: string;
  learnings: string;
  improvements: string;
  highlights: string;
}

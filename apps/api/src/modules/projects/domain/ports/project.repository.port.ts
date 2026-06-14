import { Project, ProjectStatus } from '../entities/project.entity';

export interface CreateProjectData {
  title: string;
  slug: string;
  summary: string;
  description: string | null;
  problem: string | null;
  solution: string | null;
  architecture: string | null;
  stack: string[];
  status: ProjectStatus;
  featured: boolean;
  repositoryUrl: string | null;
  demoUrl: string | null;
  coverImageUrl: string | null;
  sortOrder: number;
  type: string | null;
  operationalStatus: string | null;
  complexity: string | null;
  context: string | null;
  objective: string | null;
  restrictions: string[];
  technicalDecisions: string[];
  security: string[];
  result: string | null;
  learnings: string | null;
  improvements: string | null;
  highlights: string[];
  role: string | null;
}

export interface ProjectRepositoryPort {
  findById(id: string): Promise<Project | null>;
  findBySlug(slug: string): Promise<Project | null>;
  findAllPublished(): Promise<Project[]>;
  findAll(): Promise<Project[]>;
  save(project: Project): Promise<Project>;
  create(data: CreateProjectData): Promise<Project>;
  delete(id: string): Promise<void>;
}

export const PROJECT_REPOSITORY = Symbol('PROJECT_REPOSITORY');

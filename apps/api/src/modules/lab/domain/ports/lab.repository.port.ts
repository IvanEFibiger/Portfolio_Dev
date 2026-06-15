import { LabItem, LabStatus } from '../entities/lab.entity';

export interface CreateLabData {
  labNumber: string;
  title: string;
  slug: string;
  description: string;
  status: LabStatus;
  stack: string[];
  learning: string;
  sortOrder: number;
  published?: boolean;
}

export interface LabRepositoryPort {
  findById(id: string): Promise<LabItem | null>;
  findBySlug(slug: string): Promise<LabItem | null>;
  findAllPublished(): Promise<LabItem[]>;
  findAll(): Promise<LabItem[]>;
  save(lab: LabItem): Promise<LabItem>;
  create(data: CreateLabData): Promise<LabItem>;
  delete(id: string): Promise<void>;
}

export const LAB_REPOSITORY = Symbol('LAB_REPOSITORY');

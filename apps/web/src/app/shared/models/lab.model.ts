export type LabStatus = 'Explorando' | 'En desarrollo' | 'Documentado' | 'Archivado';

export interface LabItem {
  id: string;
  labNumber: string;
  title: string;
  slug: string;
  description: string;
  status: LabStatus;
  stack: string[];
  learning: string;
  sortOrder: number;
  published: boolean;
}

export interface LabFormValue {
  labNumber: string;
  title: string;
  slug: string;
  description: string;
  status: LabStatus;
  stack: string;
  learning: string;
  sortOrder: number;
  published: boolean;
}

// Punto de entrada del paquete compartido
// TODO: Exportar tipos, interfaces y constantes compartidas entre frontend y backend

export type SharedLabStatus = 'Explorando' | 'En desarrollo' | 'Documentado' | 'Archivado';

export interface SharedLabItem {
  id: string;
  labNumber: string;
  title: string;
  slug: string;
  description: string;
  status: SharedLabStatus;
  stack: string[];
  learning: string;
  sortOrder: number;
}

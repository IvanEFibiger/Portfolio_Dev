export type LabStatus = 'Explorando' | 'En desarrollo' | 'Documentado' | 'Archivado';

export class LabItem {
  constructor(
    public readonly id: string,
    public labNumber: string,
    public title: string,
    public slug: string,
    public description: string,
    public status: LabStatus,
    public stack: string[],
    public learning: string,
    public sortOrder: number,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}

  publish(): void {
    this.status = 'Documentado';
  }

  unpublish(): void {
    this.status = 'Explorando';
  }

  archive(): void {
    this.status = 'Archivado';
  }

  isPublished(): boolean {
    return this.status !== 'Archivado';
  }
}

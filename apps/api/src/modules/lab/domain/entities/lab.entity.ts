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
    public published: boolean,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}

  publish(): void {
    this.published = true;
  }

  unpublish(): void {
    this.published = false;
  }

  archive(): void {
    this.status = 'Archivado';
    this.published = false;
  }

  isPublished(): boolean {
    return this.published;
  }
}

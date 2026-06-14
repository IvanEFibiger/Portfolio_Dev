export type ProjectStatus = 'draft' | 'published' | 'archived';

export type ProjectOperationalStatus = 'active' | 'dev' | 'wip';

export class Project {
  constructor(
    public readonly id: string,
    public title: string,
    public slug: string,
    public summary: string,
    public description: string | null,
    public problem: string | null,
    public solution: string | null,
    public architecture: string | null,
    public stack: string[],
    public status: ProjectStatus,
    public featured: boolean,
    public repositoryUrl: string | null,
    public demoUrl: string | null,
    public coverImageUrl: string | null,
    public sortOrder: number,
    public type: string | null,
    public operationalStatus: ProjectOperationalStatus | null,
    public complexity: string | null,
    public context: string | null,
    public objective: string | null,
    public restrictions: string[],
    public technicalDecisions: string[],
    public security: string[],
    public result: string | null,
    public learnings: string | null,
    public improvements: string | null,
    public highlights: string[],
    public role: string | null,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}

  publish(): void {
    if (this.status === 'published') return;
    this.status = 'published';
  }

  unpublish(): void {
    this.status = 'draft';
  }

  archive(): void {
    this.status = 'archived';
  }

  isPublished(): boolean {
    return this.status === 'published';
  }
}

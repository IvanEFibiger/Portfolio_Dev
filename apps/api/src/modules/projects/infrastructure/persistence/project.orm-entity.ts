import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

@Entity('projects')
export class ProjectOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  @Index({ unique: true })
  @Column({ unique: true })
  slug!: string;

  @Column({ type: 'text' })
  summary!: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'text', nullable: true })
  problem?: string;

  @Column({ type: 'text', nullable: true })
  solution?: string;

  @Column({ type: 'text', nullable: true })
  architecture?: string;

  @Column({ type: 'jsonb', default: '[]' })
  stack!: string[];

  @Index()
  @Column({ default: 'draft' })
  status!: string;

  @Column({ default: false })
  featured!: boolean;

  @Column({ name: 'repository_url', nullable: true })
  repositoryUrl?: string;

  @Column({ name: 'demo_url', nullable: true })
  demoUrl?: string;

  @Column({ name: 'cover_image_url', nullable: true })
  coverImageUrl?: string;

  @Index()
  @Column({ name: 'sort_order', type: 'int', default: 0 })
  sortOrder!: number;

  @Column({ nullable: true })
  type?: string;

  @Column({ name: 'operational_status', nullable: true })
  operationalStatus?: string;

  @Column({ nullable: true })
  complexity?: string;

  @Column({ type: 'text', nullable: true })
  context?: string;

  @Column({ type: 'text', nullable: true })
  objective?: string;

  @Column({ type: 'jsonb', default: '[]' })
  restrictions!: string[];

  @Column({ name: 'technical_decisions', type: 'jsonb', default: '[]' })
  technicalDecisions!: string[];

  @Column({ type: 'jsonb', default: '[]' })
  security!: string[];

  @Column({ type: 'text', nullable: true })
  result?: string;

  @Column({ type: 'text', nullable: true })
  learnings?: string;

  @Column({ type: 'text', nullable: true })
  improvements?: string;

  @Column({ type: 'jsonb', default: '[]' })
  highlights!: string[];

  @Column({ nullable: true })
  role?: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}

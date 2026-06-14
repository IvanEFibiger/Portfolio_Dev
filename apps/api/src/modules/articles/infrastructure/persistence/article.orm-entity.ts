import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

@Entity('articles')
export class ArticleOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  @Index({ unique: true })
  @Column({ unique: true })
  slug!: string;

  @Column({ type: 'text' })
  excerpt!: string;

  @Column({ type: 'jsonb', default: '{}' })
  content!: Record<string, unknown>;

  @Column({ name: 'cover_image_url', nullable: true })
  coverImageUrl?: string;

  @Index()
  @Column({ default: 'draft' })
  status!: string;

  @Column({ default: 'public' })
  visibility!: string;

  @Column({ name: 'reading_time_minutes', nullable: true, type: 'int' })
  readingTimeMinutes?: number;

  @Index()
  @Column({ name: 'published_at', nullable: true, type: 'timestamptz' })
  publishedAt?: Date;

  @Column({ name: 'seo_title', nullable: true })
  seoTitle?: string;

  @Column({ name: 'seo_description', nullable: true, type: 'text' })
  seoDescription?: string;

  @Column({ nullable: true })
  category?: string;

  @Column({ type: 'jsonb', default: '[]' })
  tags!: string[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}

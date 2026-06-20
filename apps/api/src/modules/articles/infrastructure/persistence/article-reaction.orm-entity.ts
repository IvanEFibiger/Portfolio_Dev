import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ArticleOrmEntity } from './article.orm-entity';

@Entity('article_reactions')
@Index('IDX_article_reactions_article_type', ['articleId', 'reactionType'])
@Index('UQ_article_reactions_article_visitor', ['articleId', 'visitorHash'], { unique: true })
export class ArticleReactionOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'article_id', type: 'uuid' })
  articleId!: string;

  @ManyToOne(() => ArticleOrmEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'article_id' })
  article!: ArticleOrmEntity;

  @Column({ name: 'visitor_hash' })
  visitorHash!: string;

  @Column({ name: 'reaction_type' })
  reactionType!: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}

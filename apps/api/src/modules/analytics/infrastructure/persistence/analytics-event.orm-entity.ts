import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity('analytics_events')
export class AnalyticsEventOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Index()
  @Column()
  path!: string;

  @Index()
  @Column({ name: 'event_type', default: 'page_view' })
  eventType!: string;

  @Column({ nullable: true })
  referrer?: string;

  @Column({ name: 'user_agent_hash', nullable: true })
  userAgentHash?: string;

  @Index()
  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;
}

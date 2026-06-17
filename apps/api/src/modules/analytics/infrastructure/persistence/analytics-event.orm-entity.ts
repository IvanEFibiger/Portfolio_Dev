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

  // Hash no reversible (IP + user-agent + sal que rota a diario). Permite contar
  // visitantes únicos sin almacenar ningún dato personal ni IP en claro.
  @Index()
  @Column({ name: 'visitor_hash', nullable: true })
  visitorHash?: string;

  // Marca las visitas del propio dueño del sitio para poder descontarlas.
  @Column({ name: 'is_owner', default: false })
  isOwner!: boolean;

  @Index()
  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;
}

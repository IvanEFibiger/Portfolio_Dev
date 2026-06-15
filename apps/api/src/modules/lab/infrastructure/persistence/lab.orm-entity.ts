import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('lab_items')
export class LabOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Index({ unique: true })
  @Column({ name: 'lab_number', unique: true })
  labNumber!: string;

  @Column()
  title!: string;

  @Index({ unique: true })
  @Column({ unique: true })
  slug!: string;

  @Column({ type: 'text' })
  description!: string;

  @Index()
  @Column({ default: 'Explorando' })
  status!: string;

  @Column({ type: 'jsonb', default: '[]' })
  stack!: string[];

  @Column({ type: 'text' })
  learning!: string;

  @Index()
  @Column({ name: 'sort_order', type: 'int', default: 0 })
  sortOrder!: number;

  @Index()
  @Column({ default: false })
  published!: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}

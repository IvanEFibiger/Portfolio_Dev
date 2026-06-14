import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

@Entity('contact_messages')
export class ContactMessageOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column()
  email!: string;

  @Column({ nullable: true })
  company?: string;

  @Column({ nullable: true })
  subject?: string;

  @Column({ type: 'text' })
  message!: string;

  @Index()
  @Column({ default: 'new' })
  status!: string;

  @Column({ nullable: true })
  source?: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}

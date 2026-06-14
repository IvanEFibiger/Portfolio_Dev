import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

@Entity('newsletter_subscribers')
export class NewsletterSubscriberOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Index({ unique: true })
  @Column({ unique: true })
  email!: string;

  @Column({ default: 'pending' })
  status!: string;

  @Column({ name: 'confirmation_token', nullable: true })
  confirmationToken?: string;

  @Column({ name: 'subscribed_at', nullable: true, type: 'timestamptz' })
  subscribedAt?: Date;

  @Column({ name: 'unsubscribed_at', nullable: true, type: 'timestamptz' })
  unsubscribedAt?: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Tag } from './tag.entity';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ unique: true })
  slug: string;

  @Column()
  author: string;

  @Column('text')
  content: string;

  @Column('text')
  description: string;

  @Column({ nullable: true })
  ogImage?: string;

  @Column({ default: false })
  featured: boolean;

  @Column({ default: false })
  draft: boolean;

  @Column({ nullable: true })
  canonicalURL?: string;

  @CreateDateColumn()
  pubDatetime: Date;

  @UpdateDateColumn({ nullable: true })
  modDatetime?: Date;

  @ManyToMany(() => Tag, (tag) => tag.posts, { cascade: true })
  @JoinTable()
  tags: Tag[];
} 
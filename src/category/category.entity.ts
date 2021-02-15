import { IsString, Length } from 'class-validator';
import { Product } from '../product/product.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  Tree,
  TreeChildren,
  TreeParent,
} from 'typeorm';

@Entity()
@Tree('materialized-path')
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @IsString()
  @Length(3)
  @Column()
  name: string;

  @Column({ unique: true })
  slug: string;

  @IsString()
  @Length(3)
  @Column()
  description: string;

  @ManyToMany(() => Product, { cascade: true })
  @JoinTable()
  products?: Product[];

  @TreeChildren()
  children: Category[];

  @TreeParent()
  parent: Category;
}

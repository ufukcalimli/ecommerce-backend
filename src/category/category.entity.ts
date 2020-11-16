import { Product } from 'src/product/product.entity';
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

  @Column()
  name: string;

  @Column({ unique: true })
  slug: string;

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

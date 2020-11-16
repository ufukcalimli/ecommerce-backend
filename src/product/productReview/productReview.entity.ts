import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Product } from '../product.entity';

@Entity()
export class ProductReview {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  stars: number;

  @Column()
  title: string;

  @Column()
  text: string;

  @ManyToOne(
    () => Product,
    (product: Product) => product.reviews,
    {
      onDelete: 'CASCADE',
    },
  )
  product: Product;
}

import { IsNumber, IsString, Length } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Product } from '../product.entity';

@Entity()
export class ProductReview {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @IsString()
  @Length(3)
  @Column()
  name: string;

  @IsNumber()
  @Column()
  stars: number;

  @IsString()
  @Length(3)
  @Column()
  title: string;

  @IsString()
  @Length(3)
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

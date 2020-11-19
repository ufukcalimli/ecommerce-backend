import { IsString, Length } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Product } from '../product.entity';

@Entity()
export class ProductImage {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @IsString()
  @Length(3)
  @Column()
  url: string;

  @ManyToOne(
    () => Product,
    (product: Product) => product.images,
    {
      onDelete: 'CASCADE',
    },
  )
  product?: Product;
}

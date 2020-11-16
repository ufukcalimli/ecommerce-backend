import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Brand } from 'src/brand/brand.entity';
import { ProductPrice } from 'src/models/price.entity';
import { ProductImage } from './productImage/productImage.entity';
import { ProductReview } from './productReview/productReview.entity';

@Entity()
export class Product extends ProductPrice {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  name: string;

  @Column({ unique: true })
  slug: string;

  @Column()
  description: string;

  @Column()
  brandSlug: string;

  @Column({ default: true })
  inStock: boolean;

  @OneToMany(
    () => ProductImage,
    (image: ProductImage) => image.product,
    { onDelete: 'CASCADE', cascade: true },
  )
  images: ProductImage[];

  @OneToMany(
    () => ProductReview,
    (review: ProductReview) => review.product,
    { onDelete: 'CASCADE', cascade: true },
  )
  reviews: ProductReview[];

  @ManyToOne(
    () => Brand,
    (brand: Brand) => brand.products,
    {
      onDelete: 'CASCADE',
    },
  )
  brand?: Brand;
}

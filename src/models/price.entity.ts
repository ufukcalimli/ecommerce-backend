import { Column } from 'typeorm';

export abstract class ProductPrice {
  @Column({ nullable: true })
  salePrice?: string;

  @Column()
  regularPrice: string;

  @Column()
  priceInCents: number;
}

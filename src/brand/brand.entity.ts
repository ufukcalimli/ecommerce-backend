import { Product } from 'src/product/product.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Brand {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  name: string;

  @Column({ unique: true })
  slug: string;

  @Column()
  description: string;

  @Column()
  logo: string;

  @OneToMany(
    () => Product,
    (product: Product) => product.brand,
    { onDelete: 'CASCADE', cascade: true },
  )
  products?: Product[];
}

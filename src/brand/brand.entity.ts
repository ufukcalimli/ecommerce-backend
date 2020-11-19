import { IsString, Length } from 'class-validator';
import { Product } from 'src/product/product.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Brand {
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

  @IsString()
  @Length(3)
  @Column()
  logo: string;

  @OneToMany(
    () => Product,
    (product: Product) => product.brand,
    { onDelete: 'CASCADE', cascade: true },
  )
  products?: Product[];
}

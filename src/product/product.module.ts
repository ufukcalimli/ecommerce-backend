import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Brand } from 'src/brand/brand.entity';
import { ProductController } from './product.controller';
import { Product } from './product.entity';
import { ProductService } from './product.service';
import { ProductImage } from './productImage/productImage.entity';
import { ProductReview } from './productReview/productReview.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, Brand, ProductImage, ProductReview]),
  ],
  providers: [ProductService],
  controllers: [ProductController],
})
export class ProductModule {}

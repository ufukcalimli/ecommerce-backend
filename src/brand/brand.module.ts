import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Brand } from './brand.entity';
import { BrandService } from './brand.service';
import { BrandController } from './brand.controller';
import { Product } from '../product/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Brand, Product])],
  providers: [BrandService],
  controllers: [BrandController],
})
export class BrandModule {}

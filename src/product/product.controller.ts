import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { Pagination } from '../models/pagination';
import { Product } from './product.entity';
import { ProductService } from './product.service';

@Controller('api/v1/brands/:brandSlug/products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  async getAllProducts(
    @Param('brandSlug') brandSlug: string,
    @Query('limit') limit = '9',
    @Query('page') page = '1',
  ): Promise<Pagination<Product>> {
    return await this.productService.getProducts(brandSlug, +limit, +page);
  }

  @Get(':slug')
  async getProduct(@Param('slug') slug: string): Promise<Product | undefined> {
    return await this.productService.getProduct(slug);
  }

  @Post()
  async createProduct(
    @Param('brandSlug') brandSlug: string,
    @Body() product: Product,
  ): Promise<Product> {
    return await this.productService.createProduct(brandSlug, product);
  }

  @Put(':slug')
  async updateProduct(
    @Param('slug') slug: string,
    @Body() product: Product,
  ): Promise<Product> {
    return await this.productService.updateProduct(slug, product);
  }

  @Delete(':slug')
  async deleteProduct(@Param('slug') slug: string): Promise<void> {
    return await this.productService.deleteProduct(slug);
  }
}

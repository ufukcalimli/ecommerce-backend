import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Product } from './product.entity';
import { ProductService } from './product.service';

@Controller('api/v1/products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  async getAllProducts(): Promise<Product[]> {
    return await this.productService.getProducts();
  }

  @Get(':slug')
  async getProduct(@Param('slug') slug: string): Promise<Product | undefined> {
    return await this.productService.getProduct(slug);
  }

  @Post()
  async createProduct(@Body() product: Product): Promise<Product> {
    return await this.productService.createProduct(product);
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

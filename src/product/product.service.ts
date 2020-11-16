import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { paramCase } from 'change-case';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private brandRepository: Repository<Product>,
  ) {}

  async getProducts(): Promise<Product[]> {
    try {
      return await this.brandRepository.find();
    } catch (error) {
      throw new HttpException(error, HttpStatus.NOT_FOUND);
    }
  }

  async getProduct(slug: string): Promise<Product> {
    try {
      return await this.brandRepository.findOne({ slug });
    } catch (error) {
      throw new HttpException(error, HttpStatus.NOT_FOUND);
    }
  }

  async createProduct(product: Product): Promise<Product> {
    try {
      const newProduct: Product = {
        ...product,
        slug: paramCase(product.name),
      };
      return await this.brandRepository.save(newProduct);
    } catch (error) {
      throw new HttpException(error, HttpStatus.NOT_FOUND);
    }
  }

  async updateProduct(slug: string, product: Product): Promise<Product> {
    try {
      const currentProduct = await this.brandRepository.findOne({ slug });
      if (!currentProduct) {
        throw new HttpException(
          'Could not find a Product with given slug',
          HttpStatus.NOT_FOUND,
        );
      }

      const newProduct: Product = {
        ...currentProduct,
        ...product,
      };

      return await this.brandRepository.save(newProduct);
    } catch (error) {
      throw new HttpException(error, HttpStatus.NOT_FOUND);
    }
  }

  async deleteProduct(slug: string): Promise<void> {
    try {
      const product = await this.brandRepository.findOne({ slug });
      if (!product) {
        throw new HttpException(
          'Could not find the Product',
          HttpStatus.NOT_FOUND,
        );
      }
      this.brandRepository.remove(product);
    } catch (error) {
      throw new HttpException(error, HttpStatus.NOT_FOUND);
    }
  }
}

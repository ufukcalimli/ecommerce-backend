import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { paramCase } from 'change-case';
import { Brand } from '../brand/brand.entity';
import { Pagination } from '../models/pagination';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(Brand) private brandRepository: Repository<Brand>,
  ) {}

  async getProducts(
    brandSlug: string,
    take: number,
    page: number,
  ): Promise<Pagination<Product>> {
    try {
      const total = await this.productRepository.count();
      const products = await this.productRepository.find({
        where: { brandSlug },
        relations: ['images', 'reviews'],
        take,
        skip: (page - 1) * take,
      });

      return this.paginate(products, page, take, total);
    } catch (error) {
      throw new HttpException(error, HttpStatus.NOT_FOUND);
    }
  }

  async getProduct(slug: string): Promise<Product | undefined> {
    try {
      return await this.productRepository.findOne({ slug });
    } catch (error) {
      throw new HttpException(error, HttpStatus.NOT_FOUND);
    }
  }

  async createProduct(brandSlug: string, product: Product): Promise<Product> {
    try {
      const brand = await this.brandRepository.findOne({ slug: brandSlug });
      if (!brand) {
        throw new HttpException('Brand is not found', HttpStatus.NOT_FOUND);
      }
      const newProduct: Product = {
        ...product,
        brandSlug,
        brand,
        slug: paramCase(product.name),
      };
      return await this.productRepository.save(newProduct);
    } catch (error) {
      throw new HttpException(error, HttpStatus.NOT_FOUND);
    }
  }

  async updateProduct(slug: string, product: Product): Promise<Product> {
    try {
      const currentProduct = await this.productRepository.findOne({ slug });
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

      return await this.productRepository.save(newProduct);
    } catch (error) {
      throw new HttpException(error, HttpStatus.NOT_FOUND);
    }
  }

  async deleteProduct(slug: string): Promise<void> {
    try {
      const product = await this.productRepository.findOne({ slug });
      if (!product) {
        throw new HttpException(
          'Could not find the Product',
          HttpStatus.NOT_FOUND,
        );
      }
      this.productRepository.remove(product);
    } catch (error) {
      throw new HttpException(error, HttpStatus.NOT_FOUND);
    }
  }

  private paginate(
    items: Product[],
    currentPage: number,
    perPageItems: number,
    total: number,
  ): Pagination<Product> {
    const page = currentPage;
    const perPage = perPageItems;
    const totalPages = Math.ceil(total / perPage);
    const prevPage = page - 1 > 0 ? page - 1 : null;
    const nextPage = totalPages > page ? page + 1 : null;

    return {
      page,
      perPage,
      prevPage,
      nextPage,
      total,
      totalPages,
      data: items,
    };
  }
}

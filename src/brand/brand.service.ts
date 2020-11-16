import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Brand } from './brand.entity';
import { paramCase } from 'change-case';

@Injectable()
export class BrandService {
  constructor(
    @InjectRepository(Brand) private brandRepository: Repository<Brand>,
  ) {}

  async getBrands(): Promise<Brand[]> {
    try {
      return await this.brandRepository.find();
    } catch (error) {
      throw new HttpException(error, HttpStatus.NOT_FOUND);
    }
  }

  async getBrand(slug: string): Promise<Brand> {
    try {
      return await this.brandRepository.findOne({ slug });
    } catch (error) {
      throw new HttpException(error, HttpStatus.NOT_FOUND);
    }
  }

  async createBrand(brand: Brand): Promise<Brand> {
    try {
      console.log({ brand });
      const newBrand: Brand = {
        ...brand,
        slug: paramCase(brand.name),
      };
      console.log({ newBrand });
      return await this.brandRepository.save(newBrand);
    } catch (error) {
      throw new HttpException(error, HttpStatus.NOT_FOUND);
    }
  }

  async updateBrand(slug: string, brand: Brand): Promise<Brand> {
    try {
      const currentBrand = await this.brandRepository.findOne({ slug });
      if (!currentBrand) {
        throw new HttpException(
          'Could not find a brand with given slug',
          HttpStatus.NOT_FOUND,
        );
      }

      const newBrand: Brand = {
        ...currentBrand,
        ...brand,
      };

      return await this.brandRepository.save(newBrand);
    } catch (error) {
      throw new HttpException(error, HttpStatus.NOT_FOUND);
    }
  }

  async deleteBrand(slug: string): Promise<void> {
    try {
      const brand = await this.brandRepository.findOne({ slug });
      if (!brand) {
        throw new HttpException(
          'Could not find the brand',
          HttpStatus.NOT_FOUND,
        );
      }
      this.brandRepository.remove(brand);
    } catch (error) {
      throw new HttpException(error, HttpStatus.NOT_FOUND);
    }
  }
}

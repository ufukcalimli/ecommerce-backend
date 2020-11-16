import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Brand } from './brand.entity';
import { BrandService } from './brand.service';

@Controller('api/v1/brands')
export class BrandController {
  constructor(private brandService: BrandService) {}

  @Get()
  async getAllBrands(): Promise<Brand[]> {
    return await this.brandService.getBrands();
  }

  @Get(':slug')
  async getBrand(@Param('slug') slug: string): Promise<Brand | undefined> {
    return await this.brandService.getBrand(slug);
  }

  @Post()
  async createBrand(@Body() brand: Brand): Promise<Brand> {
    console.log({ brand });
    return await this.brandService.createBrand(brand);
  }

  @Put(':slug')
  async updateBrand(
    @Param('slug') slug: string,
    @Body() brand: Brand,
  ): Promise<Brand> {
    return await this.brandService.updateBrand(slug, brand);
  }

  @Delete(':slug')
  async deleteBrand(@Param('slug') slug: string): Promise<void> {
    return await this.brandService.deleteBrand(slug);
  }
}

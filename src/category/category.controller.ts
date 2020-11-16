import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Category } from './category.entity';
import { CategoryService } from './category.service';

@Controller('api/v1/categories')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get()
  async getAllCategories(): Promise<Category[]> {
    return await this.categoryService.getCategories();
  }

  @Get(':slug')
  async getCategory(
    @Param('slug') slug: string,
  ): Promise<Category | undefined> {
    return await this.categoryService.getCategory(slug);
  }

  @Post()
  async createCategory(@Body() category: Category): Promise<Category> {
    return await this.categoryService.createCategory(category);
  }

  @Put(':parentSlug/sub')
  postSubCategory(
    @Param('parentSlug') parentSlug: string,
    @Body() category: Category,
  ): Promise<Category> {
    return this.categoryService.createSubCategory(parentSlug, category);
  }

  @Put(':slug')
  async updateCategory(
    @Param('slug') slug: string,
    @Body() category: Category,
  ): Promise<Category> {
    return await this.categoryService.updateCategory(slug, category);
  }

  @Delete(':slug')
  async deleteCategory(@Param('slug') slug: string): Promise<void> {
    return await this.categoryService.deleteCategory(slug);
  }
}

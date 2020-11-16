import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TreeRepository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { paramCase } from 'change-case';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: TreeRepository<Category>,
  ) {}

  async getCategories(): Promise<Category[]> {
    try {
      return await this.categoryRepository.findTrees();
    } catch (error) {
      throw new HttpException(error, HttpStatus.NOT_FOUND);
    }
  }

  async getCategory(slug: string): Promise<Category> {
    try {
      const category: Category | undefined = await this.fetchCategory(slug);

      if (!category) {
        throw new HttpException('Category is not found', HttpStatus.NOT_FOUND);
      }
      // returns a category with sub categories inside
      return await this.categoryRepository.findDescendantsTree(category);
    } catch (error) {
      throw new HttpException(error, HttpStatus.NOT_FOUND);
    }
  }

  async createCategory(category: Category): Promise<Category> {
    try {
      const newCategory = {
        ...category,
        slug: paramCase(category.name),
      };
      return await this.categoryRepository.save(newCategory);
    } catch (error) {
      throw new HttpException(error, HttpStatus.NOT_FOUND);
    }
  }

  async createSubCategory(
    parent: string,
    category: Category,
  ): Promise<Category> {
    try {
      const parentCategory = await this.fetchCategory(parent);
      if (!parentCategory) {
        throw new HttpException(
          'Parent category is not found',
          HttpStatus.NOT_FOUND,
        );
      }

      const newCategory: Category = {
        ...category,
        slug: paramCase(category.name),
        parent: parentCategory,
      };

      return await this.categoryRepository.save(newCategory);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async updateCategory(slug: string, category: Category): Promise<Category> {
    try {
      const currentCategory = await this.categoryRepository.findOne({ slug });
      if (!currentCategory) {
        throw new HttpException(
          'Could not find a category with given slug',
          HttpStatus.NOT_FOUND,
        );
      }

      const newCategory: Category = {
        ...currentCategory,
        ...category,
      };

      return await this.categoryRepository.save(newCategory);
    } catch (error) {
      throw new HttpException(error, HttpStatus.NOT_FOUND);
    }
  }

  async deleteCategory(slug: string): Promise<void> {
    try {
      const category = await this.categoryRepository.findOne({ slug });
      if (!category) {
        throw new HttpException(
          'Could not find the category',
          HttpStatus.NOT_FOUND,
        );
      }
      this.categoryRepository.remove(category);
    } catch (error) {
      throw new HttpException(error, HttpStatus.NOT_FOUND);
    }
  }

  private async fetchCategory(slug: string): Promise<Category | undefined> {
    return await this.categoryRepository.findOne({ slug });
  }
}

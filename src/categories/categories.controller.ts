import { Controller, Get } from '@nestjs/common';
import { CategoriesService, CategoryDto } from './categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  async findAll(): Promise<CategoryDto[]> {
    return this.categoriesService.findAll();
  }
}

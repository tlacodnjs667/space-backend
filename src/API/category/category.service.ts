import { Injectable } from '@nestjs/common';
import { CategoryRepository } from './category.repository';

@Injectable()
export class CategoryService {
  findCategories() {
    return CategoryRepository.findCategories();
  }
}

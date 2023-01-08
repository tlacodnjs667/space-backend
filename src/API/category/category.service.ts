import { Injectable } from '@nestjs/common';
import { AppDataSource } from 'src/config/data-source';
import { MainCategories } from 'src/entities/main_categories.entity';
import { MainCategoryRepository } from './category.repository';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  findCategoryStructure = async () => {
    return await MainCategoryRepository.findCategoryStructure();
  };

  // create(createCategoryDto: CreateCategoryDto) {
  //   return 'This action adds a new category';
  // }

  // findAll() {
  //   return `This action returns all category`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} category`;
  // }

  // update(id: number, updateCategoryDto: UpdateCategoryDto) {
  //   return `This action updates a #${id} category`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} category`;
  // }
}

import { Injectable } from '@nestjs/common';
import { MainCategories } from 'src/entities/main_categories.entity';
import { Any } from 'typeorm';
import { FilterDtoForService } from './dto/filter.dto';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductService {
  getWeeklyBestByCategory(category: number) {
    return ProductRepository.getWeeklyBestByCategory(category);
  }
  getNewProduct() {
    return ProductRepository.getNewProduct();
  }
  getProductList() {
    return ProductRepository.getProductList();
  }
  async getFilters(criteria: FilterDtoForService) {
    // 필터 가져오는 함수
    criteria.mainCategory = Array.isArray(criteria.mainCategory)
      ? criteria.mainCategory.map((el) => +el)
      : null;
    console.log(criteria);

    const obj = {
      color: null,
      item: null,
      gender: null,
    };
  
    interface Obj {
      id: Array<number>;
      name: string;
    }

    const [colorFilterList] = await ProductRepository.getColorFilter(mainCategory:Array<number>,item:Array<number>,color:Array<number>)
    const [itemFilterList] = await ProductRepository.getItemFilter(mainCategory:Array<number>,item:Array<number>,color:Array<number>);
    const [genderFilterList] = await ProductRepository.getGenderFilter(mainCategory:Array<number>,item:Array<number>,color:Array<number>);
    const { item } = itemFilterList;
    const arr: Array<string> = [];
    const arr1: Array<Obj> = [];

    item.forEach((el: Obj) => {
      if (!arr.includes(el.name)) {
        arr.push(el.name);
        arr1.push(el);
      } else {
        arr1[arr.indexOf(el.name)].id = [
          arr1[arr.indexOf(el.name)].id,
          el.id,
        ].flat();
      }
    });

    obj.color = colorFilterList.color;
    obj.item = itemFilterList.item;
    obj.gender = genderFilterList.mainCate;

    return obj;
  }
}
function color(mainCategory: any, Number: NumberConstructor, item: any, Number: NumberConstructor, color: any, Number: NumberConstructor): [any] | PromiseLike<[any]> {
  throw new Error('Function not implemented.');
}


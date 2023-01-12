import { Injectable } from '@nestjs/common';
import { FilterDto } from './dto/filter.dto';
import { filterElementDTO, filterResultDTO } from './dto/get-filter.dto';
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
  async getFilters(criteria: FilterDto) {
    // 필터 가져오는 함수
    // console.log(criteria);
    const listForQuery: string[] = [];
    /*여기부터 각 필터 함수 내부에서 사용할 쿼리문 만들어주는 부분*/
    const listOfCriteria = [
      {
        field: 'i.id',
        value: criteria.item,
      },
      {
        field: 'ms.mainCategoryId',
        value: criteria.mainCategory,
      },
      {
        field: 'pc.colorId',
        value: criteria.color,
      },
    ];

    listOfCriteria.forEach((el) => {
      if (Array.isArray(el.value) && el.value?.length) {
        listForQuery.push(`${el.field} IN ( ${el.value.join(', ')} )`);
      } else if (el.value?.length)
        listForQuery.push(`${el.field} IN ( ${el.value} )`);
    });

    const query: string = listForQuery.length
      ? `WHERE ` + listForQuery.join(' AND ')
      : ``;
    console.log(query);

    //이 밑에 세가지 필터 리스트는 각 필터링된 필터들 가져나오는 부분
    const [colorFilterList] = await ProductRepository.getColorFilter(query);
    const [itemFilterList] = await ProductRepository.getItemFilter();
    const [genderFilterList] = await ProductRepository.getGenderFilter(query);
    //이 밑에는 나온 아이템 값 처리하는 부분

    const filterResult: filterResultDTO = {
      color: colorFilterList.color,
      item: itemFilterList.item
        ? makeFilteredItemStructure(itemFilterList.item)
        : undefined,
      gender: genderFilterList.mainCate,
    };
    // console.log(filterResult);
    return filterResult;
  }
}

//밑에 모듈로 뺄 return 할 아이템 id값 담은 리스트 형태 만들어주는 부분

function makeFilteredItemStructure(item: Array<filterElementDTO>) {
  const arr: Array<string> = [];
  const arr1: Array<filterElementDTO> = [];

  item.forEach((el: filterElementDTO) => {
    if (!arr.includes(el.name)) {
      // console.log(el.id);
      arr.push(el.name);
      arr1.push(el);
    } else {
      arr1[arr.indexOf(el.name)].id = [
        arr1[arr.indexOf(el.name)].id,
        el.id,
      ].flat();
    }
  });

  return arr1;
}

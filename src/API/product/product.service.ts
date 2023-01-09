import { Injectable } from '@nestjs/common';
import { FilterDto } from './dto/filter.dto';
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
    criteria.mainCategory = Array.isArray(criteria.mainCategory)
      ? criteria.mainCategory.map((el) => +el)
      : null;

    /*여기부터 각 필터 함수 내부에서 사용할 쿼리문 만들어주는 부분*/

    //이 밑에 세가지 필터 리스트는 각 필터링된 필터들 가져나오는 부분
    const [colorFilterList] = await ProductRepository.getColorFilter();
    const [itemFilterList] = await ProductRepository.getItemFilter();
    const [genderFilterList] = await ProductRepository.getGenderFilter();

    let { item } = itemFilterList;

    //이 밑에는 나온 아이템 값 처리하는 부분
    item = makeFilteredItemStructure(item);

    const filterResult = {
      color: null,
      item: null,
      gender: null,
    };

    filterResult.color = colorFilterList.color;
    filterResult.item = item; //itemFilterList.item가 아닌 우리가 데이터 형태 수정한 변수인 item값을 사용해야 함.
    filterResult.gender = genderFilterList.mainCate;

    return filterResult;
  }
}

//밑에 모듈로 뺄 return 할 아이템 id값 담은 리스트 형태 만들어주는 부분

interface Obj {
  id: Array<number>;
  name: string;
}

function makeFilteredItemStructure(item: Array<Obj>) {
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

  return item;
}

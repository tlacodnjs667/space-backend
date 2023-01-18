import { Injectable } from '@nestjs/common';
import { FilterDto, ProductListDto } from './dto/filter.dto';
import {
  filterElementDTO,
  filterResultDTO,
  // orderFilterDto,
} from './dto/get-filter.dto';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductService {
  getWeeklyBestByCategory(category: number) {
    return ProductRepository.getWeeklyBestByCategory(category);
  }
  getNewProduct() {
    return ProductRepository.getNewProduct();
  }
  async getProductList(ordering: ProductListDto, offset: number) {
    const sort: any = {
      best: `orderCount DESC`,
      review: `reviewCount DESC`,
      like: `likeCount DESC`,
      new: `news ASC`,
      low: `price ASC`,
      high: `price DESC`,
      name: `name ASC`,
    };

    let orderQuery = '';
    if (typeof ordering.sort === 'string') {
      orderQuery = `ORDER BY ${sort[ordering.sort]}`;
    }
    let whereQuery = '';
    const conditionArray = [];
    if (Array.isArray(ordering.color) && ordering.color.length) {
      conditionArray.push(`pc.colorId in (${ordering.color.join(', ')})`);
    }
    if (ordering.item) conditionArray.push(`i.id in (${ordering.item})`);

    conditionArray.push(`ms.mainCategoryId in (${ordering.mainCategory})`);

    if (conditionArray.length) {
      whereQuery = `WHERE ${conditionArray.join(' AND ')}`;
    }

    const sum = 18 * (offset - 1);

    return ProductRepository.getProductList(whereQuery, orderQuery, sum);
  }

  getProductDetail(productId: string) {
    return ProductRepository.getProductDetail(productId);
  }

  async getFilters(criteria: FilterDto) {
    // 필터 가져오는 함수
    console.log(criteria);

    const fulterValueList: string[] = [];

    const filterValue = [
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

    filterValue.map((el) => {
      if (Array.isArray(el.value) && el.value?.length) {
        fulterValueList.push(`${el.field} IN ( ${el.value.join(', ')} )`);
      } else if (el.value?.length)
        fulterValueList.push(`${el.field} IN ( ${el.value} )`);
    });

    const query: string = fulterValueList.length
      ? `WHERE ` + fulterValueList.join(' AND ')
      : ``;
    // console.log(query);
    // 파라미터 2개로 처리하는 부분
    const filterValueItemMainList: string[] = [];

    const filterValueItemMain = [
      {
        field: 'i.id',
        value: criteria.item,
      },
      {
        field: 'ms.mainCategoryId',
        value: criteria.mainCategory,
      },
    ];

    filterValueItemMain.map((el) => {
      if (Array.isArray(el.value) && el.value?.length) {
        filterValueItemMainList.push(
          `${el.field} IN ( ${el.value.join(', ')}) `,
        );
      } else if (el.value?.length) {
        filterValueItemMainList.push(`${el.field} IN ( ${el.value} )`);
      }
    });
    const itemMainQurey: string = filterValueItemMainList.length
      ? `WHERE ` + filterValueItemMainList.join(' AND ')
      : ``;

    console.log(itemMainQurey);

    const filterValueColor = [
      {
        field: 'pc.colorId',
        value: criteria.color,
      },
    ];
    const filterValueColorList: string[] = [];

    filterValueColor.map((el) => {
      if (Array.isArray(el.value) && el.value?.length) {
        filterValueColorList.push(`${el.field} IN ( ${el.value.join(', ')}) `);
      } else if (el.value?.length) {
        filterValueColorList.push(`${el.field} IN ( ${el.value} )`);
      }
    });
    const colorQurey: string = filterValueColorList.length
      ? `WHERE ` + filterValueColorList.join(' AND ')
      : ``;
    console.log(colorQurey);
    //이 밑에 세가지 필터 리스트는 각 필터링된 필터들 가져나오는 부분
    // const getProductList = await ProductRepository.getProductList(ordering);
    const [colorFilterList] = await ProductRepository.getColorFilter(query);
    const [itemFilterList] = await ProductRepository.getItemFilter(
      itemMainQurey,
      colorQurey,
    );
    const [genderFilterList] = await ProductRepository.getGenderFilter(query);
    //이 밑에는 나온 아이템 값 처리하는 부분

    const filterResult: filterResultDTO = {
      color: colorFilterList.color,
      item: itemFilterList.item
        ? makeFilteredItemStructure(
            itemFilterList.item.map((el: filterElementDTO) => {
              if (Number.isInteger(el.id)) el.id = [el.id];
              return el;
            }),
          )
        : undefined,
      gender: genderFilterList.mainCate,
    };
    console.log(filterResult);
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
  console.log(arr1);
  return arr1;
}

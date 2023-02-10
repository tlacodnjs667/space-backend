import { Injectable } from '@nestjs/common';
import { FilterDto } from './dto/filter.dto';
import { filterElementDTO, filterResultDTO } from './dto/get-filter.dto';
import { ProductListDto } from './dto/filter.dto';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductService {
  async getWeeklyBestByCategory(userId: number, category: number) {
    const obj = {
      joinQueryForLikeCheck: userId
        ? `LEFT join (
        SELECT
        id AS isLike,
        productId,
        userId
        from likes
        WHERE userId = ${userId}
        ) AS ll ON ll.productId = p.id`
        : '',
      columnDefinitionForLikeCheck: userId ? `, ll.isLike` : '',
    };

    const weeklyBest = await ProductRepository.getWeeklyBestByCategory(
      obj,
      category,
    );

    const categories = await ProductRepository.getCategory();

    return { weeklyBest, categories };
  }

  getNewProduct(userId: number) {
    const obj = {
      joinQueryForLikeCheck: userId
        ? `LEFT join (
        SELECT
        id AS isLike,
        productId,
        userId
        from likes
        WHERE userId = ${userId}
        ) AS ll ON ll.productId = p.id`
        : '',
      columnDefinitionForLikeCheck: userId ? `, ll.isLike` : '',
    };

    return ProductRepository.getNewProduct(obj);
  }

  async getProductSearch() {
    return ProductRepository.getProductSearch();
  }
  async getProductSearchList(
    ordering: ProductListDto,
    offset: number,
    criteria: FilterDto,
    userId: string,
  ) {
    const sort: any = {
      best: `orderCount DESC`,
      review: `reviewCount DESC`,
      like: `likeCount DESC`,
      new: `news ASC`,
      low: `price ASC`,
      high: `price DESC`,
      name: `name ASC`,
    };

    const count: any = {
      all: `LEFT `,
    };
    const left: string = count ? `${count[ordering.count]}` : ``;

    // let orderQuery = '';
    // if (typeof ordering.sort === 'string') {
    //   orderQuery = `ORDER BY ${sort[ordering.sort]}`;
    // }
    let orderQuery = '';
    if (typeof ordering.sort === 'string') {
      orderQuery = `ORDER BY ${sort[ordering.sort]}`;
    }
    if (ordering.sort === 'null') {
      orderQuery = ``;
    }
    let whereQuery = '';
    const conditionArray = [];
    if (ordering.color) {
      conditionArray.push(`pc.colorId in (${ordering.color})`);
    }
    if (ordering.item) conditionArray.push(`i.id in (${ordering.item})`);

    if (ordering.mainCategory)
      conditionArray.push(`ms.mainCategoryId in (${ordering.mainCategory})`);

    if (ordering.name) conditionArray.push(`p.name LIKE '%${ordering.name}%'`);

    if (conditionArray.length) {
      whereQuery = `WHERE ${conditionArray.join(' AND ')}`;
    }
    // if (conditionArray.length) {
    //   whereQuery = ``;
    // }

    const sum = 18 * (offset - 1);

    const Query: string = userId ? `WHERE l.userId = ${userId}` : ``;

    const result = await ProductRepository.getProductList(
      whereQuery,
      orderQuery,
      sum,
      Query,
    );

    const productCountList: string[] = [];

    const productCount = [
      {
        field: 'i.id',
        value: criteria.item,
      },
      {
        field: 'ms.mainCategoryId',
        value: criteria.mainCategory,
      },
    ];

    productCount.map((el) => {
      if (Array.isArray(el.value) && el.value?.length) {
        productCountList.push(`${el.field} IN ( ${el.value.join(', ')}) `);
      } else if (el.value?.length) {
        productCountList.push(`${el.field} IN ( ${el.value} )`);
      }
    });
    const itemQurey: string = productCountList.length
      ? `WHERE ` + productCountList.join(' AND ')
      : ``;

    const countColor = [
      {
        field: 'pc.colorId',
        value: criteria.color,
      },
    ];
    const countColorList: string[] = [];

    countColor.map((el) => {
      if (Array.isArray(el.value) && el.value?.length) {
        countColorList.push(`${el.field} IN ( ${el.value.join(', ')}) `);
      } else if (el.value?.length) {
        countColorList.push(`${el.field} IN ( ${el.value} )`);
      }
    });
    const colorsQurey: string = countColorList.length
      ? `WHERE ` + countColorList.join(' AND ')
      : ``;

    const [productsCountList] = await ProductRepository.getCountOrder(
      left,
      colorsQurey,
      itemQurey,
    );

    return { result, productsCountList };
  }
  async getRecommendReview(offset: number) {
    const sum = 4 * (offset - 1);
    const recommend = await ProductRepository.getRecommendReview(sum);
    return recommend;
  }
  async getProductList(
    ordering: ProductListDto,
    offset: number,
    criteria: FilterDto,
    userId: number,
  ) {
    const sort: any = {
      best: `orderCount DESC`,
      review: `reviewCount DESC`,
      like: `likeCount DESC`,
      new: `news ASC`,
      low: `price ASC`,
      high: `price DESC`,
      name: `name ASC`,
    };

    const count: any = {
      all: `LEFT `,
    };
    const left: string = count ? `${count[ordering.count]}` : ``;

    let orderQuery = '';
    if (typeof ordering.sort === 'string') {
      orderQuery = `ORDER BY ${sort[ordering.sort]}`;
    }
    if (ordering.sort === 'null') {
      orderQuery = ``;
    }

    let whereQuery = '';
    const conditionArray = [];
    if (ordering.color) {
      conditionArray.push(`pc.colorId in (${ordering.color})`);
    }

    if (ordering.item) conditionArray.push(`i.id in (${ordering.item})`);

    if (ordering.subCategory)
      conditionArray.push(`ms.subCategoryId in (${ordering.subCategory})`);

    if (ordering.mainCategory == 1) ordering.mainCategory = [2, 3, 4]; // 타입 처리

    if (ordering.mainCategory)
      conditionArray.push(`ms.mainCategoryId in (${ordering.mainCategory})`);

    if (conditionArray.length) {
      whereQuery = `WHERE ${conditionArray.join(' AND ')}`;
    }

    const sum = 18 * (offset - 1);

    const userLikeQuery: string = userId ? `WHERE l.userId = ${userId}` : ``;

    const result = await ProductRepository.getProductList(
      whereQuery,
      orderQuery,
      sum,
      userLikeQuery,
    );

    const productCountList: string[] = [];

    const productCount = [
      {
        field: 'i.id',
        value: criteria.item,
      },
      {
        field: 'ms.mainCategoryId',
        value: criteria.mainCategory,
      },
    ];

    productCount.map((el) => {
      if (Array.isArray(el.value) && el.value?.length) {
        productCountList.push(`${el.field} IN ( ${el.value.join(', ')}) `);
      } else if (el.value?.length) {
        productCountList.push(`${el.field} IN ( ${el.value} )`);
      }
    });
    const itemQurey: string = productCountList.length
      ? `WHERE ` + productCountList.join(' AND ')
      : ``;

    const countColor = [
      {
        field: 'pc.colorId',
        value: criteria.color,
      },
    ];
    const countColorList: string[] = [];

    countColor.map((el) => {
      if (Array.isArray(el.value) && el.value?.length) {
        countColorList.push(`${el.field} IN ( ${el.value.join(', ')}) `);
      } else if (el.value?.length) {
        countColorList.push(`${el.field} IN ( ${el.value} )`);
      }
    });
    const colorsQurey: string = countColorList.length
      ? `WHERE ` + countColorList.join(' AND ')
      : ``;

    const [productsCountList] = await ProductRepository.getCountOrder(
      left,
      colorsQurey,
      itemQurey,
    );

    return { result, productsCountList };
  }

  async getProductDetail(productId: string, userId: number) {
    const userCheck = userId
      ? ` LEFT JOIN (
        SELECT 
          l.productId,
          l.id AS likeId,
          l.userId AS userId
        FROM likes l 
        WHERE userId = ${userId}
        GROUP BY l.productId, l.id
      ) AS likeCheck ON likeCheck.productId = p.id
      `
      : '';

    const likeCols = userId ? `likeCheck.likeId, likeCheck.userId, ` : '';
    const groutByCondition = userId ? ', likeCheck.likeId' : '';

    const [result] = await ProductRepository.getProductDetail(
      productId,
      userCheck,
      likeCols,
      groutByCondition,
    );
    return result;
  }

  async getFilters(criteria: FilterDto) {
    // 필터 가져오는 함수

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
      // products: productsCountList.product,
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

    return filterResult;
  }
}

//밑에 모듈로 뺄 return 할 아이템 id값 담은 리스트 형태 만들어주는 부분
function makeFilteredItemStructure(item: Array<filterElementDTO>) {
  const arr: Array<string> = [];
  const arr1: Array<filterElementDTO> = [];

  item.forEach((el: filterElementDTO) => {
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

  return arr1;
}

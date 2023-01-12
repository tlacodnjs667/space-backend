import { Controller, Get, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { FindProductDto } from './dto/find-product.dto';
import { FilterDto } from './dto/filter.dto';
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('best')
  getWeeklyBestByCategory(@Query('category') categoryId: FindProductDto) {
    return this.productService.getWeeklyBestByCategory(Number(categoryId));
  }

  @Get('new')
  getNewProduct() {
    return this.productService.getNewProduct();
  }

  @Get('list')
  getProductList() {
    return this.productService.getProductList();
  }

  @Get('filter')
  getFilters(@Query() criteria: FilterDto) {
    console.log(criteria);
    criteria.item = makeMainCategoryStructure(criteria.item);
    console.log(criteria.item); //삭제될 수도 있는 부분
    return this.productService.getFilters(criteria);
  }
}

function makeMainCategoryStructure(item: string | undefined) {
  if (item) {
    return item?.split('[').join('').split(']').join('').split(',');
  }
}

import { Controller, Get, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { FindProductDto } from './dto/find-product.dto';
import { FilterDto, FilterDtoForService } from './dto/filter.dto';
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
    const a: string | undefined = criteria.mainCategory;
    let b: string[] | undefined;
    if (criteria.mainCategory) {
      b = a?.split('[').join('').split(']').join('').split(',');
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const criteriaForService: FilterDtoForService = {
      mainCategory: b,
      item: criteria.item,
      color: criteria.color,
    };

    return this.productService.getFilters(criteria);
  }
}

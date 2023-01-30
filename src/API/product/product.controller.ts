import { Controller, Get, Headers, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { FindProductDto } from './dto/find-product.dto';
import { FilterDto, ProductListDto } from './dto/filter.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('best')
  getWeeklyBestByCategory(
    @Headers('user') userId: number,
    @Query('category') categoryId: number,
  ) {
    return this.productService.getWeeklyBestByCategory(
      userId,
      Number(categoryId),
    );
  }

  @Get('new')
  getNewProduct(@Headers('user') userId: number) {
    return this.productService.getNewProduct(userId);
  }

  @Get('list')
  getProductList(
    @Query() ordering: ProductListDto,
    @Query('offset') offset: string,
  ) {
    return this.productService.getProductList(ordering, +offset);
  }

  @Get('detail')
  getProductDetail(@Query('productId') productId: string) {
    return this.productService.getProductDetail(productId);
  }

  @Get('filter')
  getFilters(@Query() criteria: FilterDto) {
    console.log(criteria);
    // criteria.item = makeMainCategoryStructure(criteria.item);
    console.log(criteria.item); //삭제될 수도 있는 부분
    return this.productService.getFilters(criteria);
  }
}

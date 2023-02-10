import { Controller, Get, Headers, Param, Query } from '@nestjs/common';
import { ProductService } from './product.service';
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
    @Headers('user') userId: number,
    @Query() ordering: ProductListDto,
    @Query('offset') offset: string,
    @Query() criteria: FilterDto,
  ) {
    console.log(offset);
    return this.productService.getProductList(
      ordering,
      +offset,
      criteria,
      userId,
    );
  }

  @Get('recommend')
  getRecommendReview(@Query('offset') offset: string) {
    return this.productService.getRecommendReview(+offset);
  }

  @Get('detail/:productId')
  getProductDetail(
    @Param('productId') productId: string,
    @Headers('user') userId: number,
  ) {
    return this.productService.getProductDetail(productId, +userId);
  }

  @Get('search')
  getProductSearch() {
    return this.productService.getProductSearch();
  }

  @Get('search-list')
  getProductSearchList(
    @Headers('user') userId: string,
    @Query() ordering: ProductListDto,
    @Query('offset') offset: string,
    @Query() criteria: FilterDto,
  ) {
    return this.productService.getProductSearchList(
      ordering,
      +offset,
      criteria,
      userId,
    );
  }
  @Get('filter')
  getFilters(@Query() criteria: FilterDto) {
    console.log(criteria);
    // criteria.item = makeMainCategoryStructure(criteria.item);
    console.log(criteria.item); //삭제될 수도 있는 부분
    return this.productService.getFilters(criteria);
  }
}

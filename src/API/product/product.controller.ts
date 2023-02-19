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
  async getProductList(
    @Headers('user') userId: number,
    @Query() ordering: ProductListDto,
    @Query('offset') offset: string,
    @Query() criteria: FilterDto,
  ) {
    const result = await this.productService.getProductList(
      ordering,
      +offset,
      criteria,
      userId,
    );

    return result;
  }

  @Get('recommend')
  getRecommendReview(@Query('offset') offset: string) {
    return this.productService.getRecommendReview(+offset);
  }

  @Get('detail/:productId')
  async getProductDetail(
    @Param('productId') productId: string,
    @Headers('user') userId: number,
  ) {
    const result = await this.productService.getProductDetail(
      productId,
      +userId,
    );

    return result;
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
    // criteria.item = makeMainCategoryStructure(criteria.item);

    return this.productService.getFilters(criteria);
  }
}

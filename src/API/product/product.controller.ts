import { Controller, Get, Headers, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { FindProductDto } from './dto/find-product.dto';
<<<<<<< HEAD
import { FilterDto } from './dto/filter.dto';
=======
import { FilterDto, ProductListDto } from './dto/filter.dto';

>>>>>>> 09e7ae51c85a448d7b3b34d96cd88e53db8ee9ae
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
  getProductList(
    @Query() ordering: ProductListDto,
    @Query('offset') offset: string,
    @Query() criteria: FilterDto,
    @Headers('user') userId: string,
  ) {
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

  @Get('detail')
  getProductDetail(@Query('productId') productId: string) {
    return this.productService.getProductDetail(productId);
  }
  @Get('search')
  getProductSearch() {
    return this.productService.getProductSearch();
  }

  @Get('searchList')
  getProductSearchList(
    @Query() ordering: ProductListDto,
    @Query('offset') offset: string,
    @Query() criteria: FilterDto,
    @Headers('user') userId: string,
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
<<<<<<< HEAD
    criteria.item = makeMainCategoryStructure(criteria.item);
=======
    // criteria.item = makeMainCategoryStructure(criteria.item);
>>>>>>> 09e7ae51c85a448d7b3b34d96cd88e53db8ee9ae
    console.log(criteria.item); //삭제될 수도 있는 부분
    return this.productService.getFilters(criteria);
  }
}
<<<<<<< HEAD

function makeMainCategoryStructure(item: string | undefined) {
  if (item) {
    return item?.split('[').join('').split(']').join('').split(',');
  }
}
=======
>>>>>>> 09e7ae51c85a448d7b3b34d96cd88e53db8ee9ae

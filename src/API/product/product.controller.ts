import { Controller, Get, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { FindProductDto } from './dto/find-product.dto';
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
  productList() {
    return this.productService.productList();
  }
}

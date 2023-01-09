<<<<<<< HEAD
import { Body, Controller, Get, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { FindProductDto } from './dto/find-product.dto';
import { ProductRepository } from './product.repository';
=======
import { Controller, Get } from '@nestjs/common';
import { ProductService } from './product.service';
>>>>>>> 9f30209... wip

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
<<<<<<< HEAD

  @Get('best')
  getWeeklyBestByCategory(@Query('category') categoryId: FindProductDto) {
    return this.productService.getWeeklyBestByCategory(Number(categoryId));
  }

  @Get('new')
  getNewProduct() {
    return this.productService.getNewProduct();
=======
  @Get('list')
  productList() {
    return this.productService.productList();
>>>>>>> 9f30209... wip
  }
}

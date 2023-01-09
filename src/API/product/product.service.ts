import { Injectable } from '@nestjs/common';
<<<<<<< HEAD
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductService {
  getWeeklyBestByCategory(category: number) {
    return ProductRepository.getWeeklyBestByCategory(category);
  }

  getNewProduct() {
    return ProductRepository.getNewProduct();
=======
import { ProductRepository } from './Product.repository';

@Injectable()
export class ProductService {
  productList() {
    return ProductRepository.ProductList();
>>>>>>> 9f30209... wip
  }
}

import { Injectable } from '@nestjs/common';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductService {
  getWeeklyBestByCategory(category: number) {
    return ProductRepository.getWeeklyBestByCategory(category);
  }

  getNewProduct() {
    return ProductRepository.getNewProduct();
  }
}

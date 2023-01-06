import { Injectable } from '@nestjs/common';
import { AppDataSource } from 'src/config/data-source';
import { MainCategories } from 'src/entities/main_categories.entity';
import { Product } from 'src/entities/products.entity';
import { DataSource } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
@Injectable()
export class ProductService { 
    findAll = async()=> {
    const productList = await AppDataSource.query

    
    return productList;
  }


}

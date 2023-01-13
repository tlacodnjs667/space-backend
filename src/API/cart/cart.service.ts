import { Injectable } from '@nestjs/common';
import { CartRepository } from './cart.repository';
import { CreateCartDto } from './dto/create-cart.dto';

@Injectable()
export class CartService {
  async createUserCart(req: CreateCartDto) {
    // return CartRepository.createCart(req);
  }
}

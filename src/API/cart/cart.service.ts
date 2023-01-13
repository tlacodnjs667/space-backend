import { Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';

@Injectable()
export class CartService {
  async createUserCart(req: CreateCartDto) {}
}

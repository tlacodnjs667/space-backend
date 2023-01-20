import { Controller, Post, Body, Headers } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  async createUserCart(@Body() req: CreateCartDto) {
    return this.cartService.createUserCart(req);
  }
}

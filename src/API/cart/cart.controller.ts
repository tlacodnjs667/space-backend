import {
  Controller,
  Post,
  Get,
  Body,
  Patch,
  Query,
  Headers,
  Delete,
} from '@nestjs/common';
import { CartService } from './cart.service';
import {
  CreateCartDto,
  UpdateCartDto,
  UpdateItemDto,
} from './dto/create-cart.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  async createUserCart(
    @Body() cartItem: CreateCartDto,
    @Headers('user') userId: number,
  ) {
    return this.cartService.createUserCart(cartItem, +userId);
  }

  @Get()
  getUserCart(@Headers('user') userId: number) {
    return this.cartService.getUserCart(userId);
  }

  @Patch('quantity')
  updateQuantityCart(
    @Query() optionItem: UpdateCartDto,
    @Headers('user') userId: number,
  ) {
    return this.cartService.updateQuantityCart(optionItem, userId);
  }

  @Patch('option')
  updateProdutCart(
    @Query() CartOption: UpdateItemDto,
    @Headers('user') userId: number,
  ) {
    return this.cartService.updateProductCart(CartOption, userId);
  }
  @Delete()
  deleteCart(
    @Headers('user') userId: number,
    @Query('cartId') cartId: number | number[],
  ) {
    return this.cartService.deleteCart(userId, cartId);
  }
}

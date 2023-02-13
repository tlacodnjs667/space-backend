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
    await this.cartService.createUserCart(cartItem, +userId);
    const message = 'success';
    return { message };
  }
  @Get()
  getUserCart(@Headers('user') userId: number) {
    return this.cartService.getUserCart(userId);
  }

  @Patch('quantity')
  async updateQuantityCart(
    @Query() optionItem: UpdateCartDto,
    @Headers('user') userId: number,
  ) {
    await this.cartService.updateQuantityCart(optionItem, userId);
    const message = 'patch';
    return { message };
  }

  @Patch('option')
  async updateProdutCart(
    @Query() CartOption: UpdateItemDto,
    @Headers('user') userId: number,
  ) {
    await this.cartService.updateProductCart(CartOption, userId);
    const message = 'success';
    return { message };
  }
  @Delete()
  async deleteCart(
    @Headers('user') userId: number,
    @Query('cartId') cartId: number | number[],
  ) {
    await this.cartService.deleteCart(userId, cartId);
    const message = 'delete';
    return { message };
  }
}

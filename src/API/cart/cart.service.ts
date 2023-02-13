import { Injectable } from '@nestjs/common';
import { CartRepository } from './cart.repository';
import {
  CreateCartDto,
  UpdateCartDto,
  UpdateItemDto,
} from './dto/create-cart.dto';

@Injectable()
export class CartService {
  async createUserCart(cartItem: CreateCartDto, userId: number) {
    const array: any = [];
    const id = userId;
    cartItem.cartItem.forEach((el) => {
      array.push(`(${el.optionId}, ${el.quantity}, ${id})`);
    });
    const addCart = array.join(', ');
    const checkUserCart = await CartRepository.CheckUserCart(
      userId,
      cartItem.cartItem[0].optionId,
    );
    if (checkUserCart.length == 0) {
      return await CartRepository.createUserCart(addCart);
    } else if (checkUserCart.length == 1) {
      return await CartRepository.updateUserCart(
        +userId,
        +cartItem.cartItem[0].optionId,
        checkUserCart[0].quantity + Number(cartItem.cartItem[0].quantity),
      );
    }
  }

  getUserCart(userId: number) {
    return CartRepository.getUserCart(userId);
  }

  async updateQuantityCart(optionItem: UpdateCartDto, userId: number) {
    await CartRepository.updateQuantityCart(
      optionItem.cartId,
      optionItem.quantity,
      userId,
    );
    return CartRepository.getUserCart(userId);
  }
  async updateProductCart(cartOption: UpdateItemDto, userId: number) {
    await CartRepository.updateProductCart(
      +cartOption.optionId,
      +cartOption.cartId,
      userId,
    );
    return CartRepository.getUserCart(userId);
  }

  async deleteCart(userId: number, cartId: number | number[]) {
    const query = cartId
      ? `WHERE userId = ${userId} AND id IN (${cartId})`
      : `WHERE userId = ${userId}`;

    return CartRepository.deleteCart(query);
  }
}

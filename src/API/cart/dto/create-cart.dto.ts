export class CreateCartDto {
  cartItem: CartItem[];
}

export class CartItem {
  optionId: any;
  quantity: any;
}
export class UpdateCartDto {
  cartId: number;
  quantity: number;
}

export class UpdateItemDto {
  cartId: string;
  optionId: string;
}

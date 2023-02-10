export class CreateCartDto {
  optionId: string | number; //프로덕트 옵션 id
  quantity: string | number;
}

export class UpdateCartDto {
  cartId: number;
  quantity: number;
}

export class UpdateItemDto {
  cartId: string;
  optionId: string;
}

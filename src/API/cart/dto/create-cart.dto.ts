export class CreateCartDto {
  optionId: string | number; //프로덕트 옵션 id
  quantity: string | number;
}

export class UpdateCartDto {
  cartId: string;
  quantity: string;
}

export class UpdateItemDto {
  cartId: string;
  optionId: string;
}

export class CreateOrderDto {
  address: string;
  detail_address: string;
  zip_code: string;
  phone: string;
  name: string;
  orderNumber: string;
  trackingNumber: string[] | string;
}

export class CreateOrderDtoByUser extends CreateOrderDto {
  price: number;
  cartInfo: number[]; //cart의 ID 값
}

export class CreateOrderDtoByOption extends CreateOrderDto {
  optionId: number;
  quantity: number;
  trackingNumber: string;
  price?: number;
}

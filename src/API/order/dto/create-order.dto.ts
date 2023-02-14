export class CreateOrderDto {
  address: string;
  detail_address: string;
  zip_code: string;
  phone: string;
  name: string;
  orderNumber: string;
  trackingNumber: string[] | string;
  price: number;
}

export class CreateOrderDtoByUser extends CreateOrderDto {
  price: number;
  cartInfo: number[]; //cart의 ID 값
}

export class CreateOrderDtoByOption extends CreateOrderDto {
  optionId: number;
  quantity: number;
  trackingNumber: string;
}

export class CreateOrderDtoByOptionInProductDetail extends CreateOrderDto {
  optionsInfo: CreateOrderAtProductDetail[];
  trackingNumber: string;
}

export interface CreateOrderAtProductDetail {
  optionId: number;
  quantity: number;
}

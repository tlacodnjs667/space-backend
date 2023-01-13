export class CreateOrderDto {
  orderNumber: string;
  trackingNumber: string[];
  userId: number;
  price: number;
  products: ProductInterface[] | string;
  optionInfos?: string;
  quantity?: string;
}

export interface ProductInterface {
  optionId: number;
  quantity: number;
}

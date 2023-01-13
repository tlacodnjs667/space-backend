export class CreateOrderDto {
  orderNumber: string;
  trackingNumber: string[];
  price: number;
  products: ProductListForOrder[] | string;
  optionInfos?: string;
  address: string;
  detail_address: string;
  zip_number: string;
}

export interface ProductListForOrder {
  optionId: number;
  quantity: number;
}

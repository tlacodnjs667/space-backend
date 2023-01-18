export class CreateOrderDto {
  orderNumber: string;
  trackingNumber: string[];
  userId: number;
  price: number;
  products: (string | number)[] | string; //cart의 ID 값
  optionInfos?: string;
  quantity?: string;
  address: string;
  detail_address: string;
  zip_code: string;
}

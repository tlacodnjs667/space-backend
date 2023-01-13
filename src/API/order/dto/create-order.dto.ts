export class CreateOrderDto {
  orderNumber: string;
  trackingNumber: string[];
  userId: number;
  price: number;
  products: (string | number)[]; //cart의 ID 값
  optionInfos?: string;
  quantity?: string;
}

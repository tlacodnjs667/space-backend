export interface ProductInfo {
  optionId: number;
  quantity: number;
  userId: number;
}

export interface GetOrderInfoFilter {
  history_start_date?: string;
  history_end_date?: string;
  order_status?:
    | 'BEFORE_PAYMENT'
    | 'PAYMENT_PROCEEDING'
    | 'PAID'
    | 'CANCLE_PAYMENT'
    | 'REFUNDED'
    | 'PURCHASE_CONFIRMED';
}

export interface OrderHistoryFilter {
  name: string;
  filter: string;
}

export interface ReturnCreated {
  fieldCount: number;
  affectedRows: number;
  insertId: number;
  info: string;
  serverStatus: number;
  warningStatus: number;
}

export interface ProductsByOrder {
  orderProductId: number;
  shipmentStatusId: number;
  productOptionId: number;
  priceByOption: number;
  quantity: number;
}

export interface OrderGoods {
  goodsCode: string;
  number: number;
  unitPrice: number;
  purchasePrice: number;
}

export interface Order {
  id?: number;
  orderNo: string;
  shopId: number;
  orderTime: string;
  customer: string;
  remark: string;
  goodsList: Array<OrderGoods>;
}

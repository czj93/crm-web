export enum GoodsStatus {
  // 下架
  SoldOut = "0",
  // 上架
  Putaway = "1"
}

export interface GoodsType {
  id?: number;
  goodsName: string;
  goodsCode: string;
  spces: string;
  unit: string;
  status: GoodsStatus;
  purchasePrice: number;
  retailPrice: number;
  remark: string;
}

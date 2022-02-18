import { http } from "/@/utils/http";
import type { StockType } from "./types";
import type { PaginateResult } from "/@/views/type";

export const list = params => {
  return http.request<PaginateResult<StockType>>("get", "/stock/list", {
    params
  });
};

// export const create = (data: ShopType) => {
//   return http.request("post", "/stock", { data });
// };

// export const update = (id: number, data: ShopType) => {
//   return http.request("patch", `/stock/${id}`, { data });
// };

// export const remove = (goodsCode: string) => {
//   return http.request("delete", `/stock/${goodsCode}`);
// };

// export const detail = (goodsCode: string) => {
//   return http.request<DetailResult<StockType>>("get", `/stock/${goodsCode}`);
// };

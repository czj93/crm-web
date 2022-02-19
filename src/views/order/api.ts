import { http } from "/@/utils/http";
import type { Order } from "./types";
import type { PaginateResult, DetailResult } from "/@/views/type";

export const list = params => {
  return http.request<PaginateResult<Order>>("get", "/order", {
    params
  });
};

export const create = (data: Order) => {
  return http.request("post", "/order", { data });
};

export const update = (id: number, data: Order) => {
  return http.request("patch", `/order/${id}`, { data });
};

// export const remove = (id: number) => {
//   return http.request("delete", `/order/${id}`);
// };

export const detail = (id: number) => {
  return http.request<DetailResult<Order>>("get", `/order/${id}`);
};

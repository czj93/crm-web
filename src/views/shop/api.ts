import { http } from "/@/utils/http";
import type { ShopType } from "./types";
import type { PaginateResult, DetailResult } from "/@/views/type";

export const list = params => {
  return http.request<PaginateResult<ShopType>>("get", "/shop", {
    params
  });
};

export const create = (data: ShopType) => {
  return http.request("post", "/shop", { data });
};

export const update = (id: number, data: ShopType) => {
  return http.request("patch", `/shop/${id}`, { data });
};

export const remove = (id: number) => {
  return http.request("delete", `/shop/${id}`);
};

export const detail = (id: number) => {
  return http.request<DetailResult<ShopType>>("get", `/shop/${id}`);
};

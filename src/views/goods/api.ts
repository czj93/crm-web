import { http } from "/@/utils/http";
import type { GoodsType } from "./types";
import type { PaginateResult, DetailResult } from "/@/views/type";

export const list = params => {
  return http.request<PaginateResult<GoodsType>>("get", "/goods", {
    params
  });
};

export const create = (data: GoodsType) => {
  return http.request("post", "/goods", { data });
};

export const update = (id: number, data: GoodsType) => {
  return http.request("patch", `/goods/${id}`, { data });
};

export const remove = (id: number) => {
  return http.request("delete", `/goods/${id}`);
};

export const detail = (id: number) => {
  return http.request<DetailResult<GoodsType>>("get", `/goods/${id}`);
};

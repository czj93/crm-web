import { http } from "/@/utils/http";
import type { ShopType } from "./types";

export const list = params => {
  return http.request("get", "/shop", { params });
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
  return http.request("get", `/shop/${id}`);
};

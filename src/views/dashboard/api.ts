import { http } from "/@/utils/http";
import type { DetailResult } from "/@/views/type";
/**
 * 完整的业务信息
 * @param params
 * @returns
 */
export const totalSaleInfo = () => {
  return http.request<DetailResult<any>>("get", "/analysis/dashboard");
};

export const shopInfo = () => {
  return http.request<DetailResult<any>>("get", "/analysis/shop");
};

export const goodsInfo = () => {
  return http.request<DetailResult<any>>("get", "/analysis/goods");
};

export const lastYearInfo = () => {
  return http.request<DetailResult<any>>("get", "/analysis/last-year");
};

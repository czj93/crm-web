import { http } from "/@/utils/http";
import type { GoodsEntryRecordType } from "./types";
import type { PaginateResult, DetailResult } from "/@/views/type";

export const list = params => {
  return http.request<PaginateResult<GoodsEntryRecordType>>(
    "get",
    "/goods-entry-record",
    {
      params
    }
  );
};

export const create = (data: GoodsEntryRecordType) => {
  return http.request("post", "/goods-entry-record", { data });
};

export const update = (id: number, data: GoodsEntryRecordType) => {
  return http.request("patch", `/goods-entry-record/${id}`, { data });
};

// export const remove = (id: number) => {
//   return http.request("delete", `/goods-entry-record/${id}`);
// };

export const detail = (id: number) => {
  return http.request<DetailResult<GoodsEntryRecordType>>(
    "get",
    `/goods-entry-record/${id}`
  );
};

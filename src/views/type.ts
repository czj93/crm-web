export type infoType = {
  svg?: string;
  code?: number;
  info?: string;
  accessToken?: string;
};

export type TMessage = string;

export type TExceptionOption =
  | TMessage
  | {
      message: TMessage;
      error?: any;
    };

export interface HttpResultPaginate<T> {
  data: T[];
  pagination: {
    total: number;
    current: number;
    totalPage: number;
    pageSize: number;
  };
}

export type HttpResponseBase = {
  success: boolean;
  message: TMessage;
};

export type HttpErrorResponse = HttpResponseBase & {
  code: number;
  // error: any
  debug?: string;
};

export type PaginateResult<T> = HttpResponseBase & {
  result: HttpResultPaginate<T>;
};

export type DetailResult<T> = HttpResponseBase & {
  result: T;
};

export type HttpSuccessResponse<T> = HttpResponseBase & {
  result?: T | HttpResultPaginate<T>;
};

export type HttpResponse<T> = HttpSuccessResponse<T> | HttpErrorResponse;

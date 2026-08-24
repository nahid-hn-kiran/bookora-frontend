export interface ApiMeta {
  page?: number;
  limit?: number;
  total?: number;
  totalPage?: number;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  meta?: ApiMeta | null;
  data: T;
}

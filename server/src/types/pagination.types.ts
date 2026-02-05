export interface ICursorPaginationRequest {
  cursor?: string;
  limit?: number;
}

export interface IPaginatedResponse<T> {
  data: T[];
  nextCursor: string | null;
  hasMore: boolean;
}

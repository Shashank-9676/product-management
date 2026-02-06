export interface IPaginatedResponse<T> {
  data: T[];
  nextCursor: string | null;
  hasMore: boolean;
}

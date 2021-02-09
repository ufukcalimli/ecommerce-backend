export interface Pagination<T> {
  page: number;
  perPage: number;
  prevPage: number | null;
  nextPage: number | null;
  total: number;
  totalPages: number;
  data: T[];
}

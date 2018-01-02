export type Direction = "asc" | "desc"

export interface IPagination<T> {
  currentPage?: number
  items: T[]
  lastPage: number
  perPage?: number
}

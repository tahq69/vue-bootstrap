import Vue, { VueConstructor } from "vue"
import { Location, Route } from "vue-router"

import { IDictionary } from "./index"

export type Direction = "asc" | "desc"

export type CreatePagination<T extends IPagingItem> = (paging: Paging<T>, to: Route, from: Route) => Promise<IPaging<T>>
export type Id = number | string

export interface IPagingItem {
  id: Id
}

export interface IPaging<T extends IPagingItem> {
  currentPage?: number
  items: T[]
  lastPage: number
  perPage?: number
}

export interface IPaginationBaseOptions {
  activeClass?: string
  disabledClass?: string
  show?: number
  sortBy?: string
  sortDirection?: Direction
  perPage?: number
  perPageOptions?: number[]
}

export interface IPaginationOptions extends IPaginationBaseOptions {
  vm?: Vue
  route?: Location
}

export declare class Paging<T extends IPagingItem> {
  public direction: Direction
  public page: number
  public perPage: number
  public sort: string
  public vm?: Vue

  public activeClass: string
  public disabledClass: string
  public items: T[]
  public lastPage: number
  public perPageOptions: number[]
  public selected: T | null
  public show: number

  constructor(options?: IPaginationOptions)

  public route: Location
  public urlParams: IDictionary<string>

  public init(callback: (paging: Paging<T>) => void): Promise<void>
  public classes(item: T, extra?: IDictionary<boolean>): IDictionary<boolean>
  public select(item: T): void
  public update(pagination: IPaging<T>): boolean
}

export declare function createPaging<T extends IPagingItem>(
  callback: CreatePagination<T>,
  options?: IPaginationBaseOptions
): {
  mixin: VueConstructor<Record<never, any> & Vue>
  paging: Paging<T>
}

import Vue from "vue"
import { Location } from "vue-router"

import { IDictionary } from "$/index"

export type Direction = "asc" | "desc"

export interface IPagination<T> {
  currentPage?: number
  items: T[]
  lastPage: number
  perPage?: number
}

export interface IPaginationOptions {
  route?: Location
  activeClass?: string
  disabledClass?: string
  show?: number
  sortBy?: string
  sortDirection?: Direction
  perPage?: number
  perPageOptions?: number[]
}

export declare class Paging<T extends { id: string | number }> {
  public direction: Direction
  public page: number
  public perPage: number
  public sort: string
  public vm: Vue

  public activeClass: string
  public disabledClass: string
  public items: T[]
  public lastPage: number
  public perPageOptions: number[]
  public selected: T | null
  public show: number

  constructor(vm: Vue, options?: IPaginationOptions)

  public route: Location
  public urlParams: IDictionary<string>

  public init(callback: (paging: Paging<T>) => void): Promise<void>
  public classes(item: T, extra?: IDictionary<boolean>): IDictionary<boolean>
  public select(item: T): void
  public update(pagination: IPagination<T>): void
}

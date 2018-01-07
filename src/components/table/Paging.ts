import Vue from "vue"
import { Location } from "vue-router"

import { IDictionary, IPaginationOptions, IPaging } from "$/index"
import { Direction } from "$/table"

export class Paging<T extends { id: string | number }> {
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

  // tslint:disable-next-line:variable-name
  private _route: Location

  constructor(
    {
      activeClass = "active",
      disabledClass = "disabled",
      perPage = 10,
      perPageOptions = [5, 10, 20, 50, 100],
      route,
      show = 5,
      sortBy = "id",
      sortDirection = "desc",
      vm,
    }: IPaginationOptions = {
      activeClass: "active",
      disabledClass: "disabled",
      perPage: 10,
      perPageOptions: [5, 10, 20, 50, 100],
      show: 5,
      sortBy: "id",
      sortDirection: "desc",
    }
  ) {
    this._route = route || {}
    this.lastPage = 0
    this.items = []
    this.activeClass = activeClass
    this.disabledClass = disabledClass
    this.selected = null
    this.show = show || 10
    this.perPageOptions = perPageOptions

    if (vm) {
      this.sort = vm.$route.params.sort || sortBy
      this.direction = (vm.$route.params.direction || sortDirection) as Direction
      this.perPage = parseInt(vm.$route.params.perPage, 10) || perPage
      this.page = parseInt(vm.$route.params.page, 10) || 1

      this.vm = vm
    } else {
      this.sort = sortBy
      this.direction = sortDirection as Direction
      this.perPage = perPage
      this.page = 1
    }
  }

  public get route(): Location {
    return {
      ...this._route,
      params: {
        ...this._route.params,
        direction: this.direction.toString(),
        page: this.page.toString(),
        perPage: this.perPage.toString(),
        sort: this.sort,
      },
    }
  }

  public get urlParams(): IDictionary<string> {
    return {
      page: (this.page || 1).toString(),
      per_page: (this.perPage || 10).toString(),
      sort_by: this.sort,
      sort_direction: this.direction,
    }
  }

  public async init(callback: (paging: Paging<T>) => void, vm?: Vue) {
    if (!this.vm && !vm) return

    const vue = (this.vm ? this.vm : vm) as Vue
    await callback(this)
    vue.$watch("$route.params", async (newValues, oldValues) => {
      if (!this.isPagingParamsChanged(newValues, oldValues)) return

      // update current paging values
      this.page = parseInt(newValues.page, 10)
      this.perPage = parseInt(newValues.perPage, 10) || 10
      this.direction = newValues.direction || "desc"
      this.sort = newValues.sort || "id"

      // call callback after data in paging object was updated
      await callback(this)
    })
  }

  public classes(item: T, extra = {}) {
    return {
      "crip-table-row": true,
      [this.activeClass]: this.selected && this.selected.id === item.id,
      ...extra,
    }
  }

  public select(item: T) {
    this.selected = item
  }

  public update(pagination: IPaging<T>) {
    this.page = pagination.currentPage || this.page
    this.perPage = pagination.perPage || this.perPage
    this.lastPage = pagination.lastPage
    this.items = pagination.items

    // this will allow return to page where we last time left
    this.route.params
      ? (this.route.params.page = this.page.toString())
      : (this.route.params = {
          direction: this.direction.toString(),
          page: this.page.toString(),
          perPage: this.perPage.toString(),
          sort: this.sort,
        })

    return true
  }

  private isPagingParamsChanged(a: any, b: any) {
    return (
      a.page !== b.page ||
      a.sort !== b.sort ||
      a.direction !== b.direction ||
      a.perPage !== b.perPage
    )
  }
}

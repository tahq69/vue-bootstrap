import Vue from "vue"
import { Location } from "vue-router"

import { IDictionary, IPagination } from "$/index"

export class Paging<T extends { id: string | number }> {
  public direction: string
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

  // tslint:disable-next-line:variable-name
  private _route: Location

  constructor(
    vm: Vue,
    {
      route = {} as Location,
      activeClass = "active",
      disabledClass = "disabled",
      show = 5,
      sortBy = "id",
      sortDirection = "desc",
      perPage = 10,
      perPageOptions = [5, 10, 20, 50, 100],
    }
  ) {
    this._route = route
    this.lastPage = 0
    this.items = []
    this.activeClass = activeClass
    this.disabledClass = disabledClass
    this.selected = null
    this.show = show
    this.perPageOptions = perPageOptions

    this.sort = vm.$route.params.sort || sortBy
    this.direction = vm.$route.params.direction || sortDirection
    this.perPage = parseInt(vm.$route.params.perPage, 10) || perPage
    this.page = parseInt(vm.$route.params.page, 10) || 1

    this.vm = vm
  }

  public get route() {
    return {
      ...this._route,
      params: {
        ...this._route.params,
        direction: this.direction,
        page: this.page,
        perPage: this.perPage,
        sort: this.sort,
      },
    }
  }

  public get urlParams(): IDictionary<string> {
    return {
      page: this.page.toString(),
      per_page: this.perPage.toString(),
      sort_by: this.sort,
      sort_direction: this.direction,
    }
  }

  public async init(callback: (paging: Paging<T>) => void) {
    await callback(this)
    this.vm.$watch("$route.params", async (newValues, oldValues) => {
      if (!this.isPagingParamsChanged(newValues, oldValues)) return

      // update current paging values
      this.page = parseInt(newValues.page, 10)
      this.perPage = parseInt(newValues.perPage, 10) || 10
      this.direction = newValues.direction || "asc"
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

  public update(pagination: IPagination<T>) {
    this.page = pagination.currentPage || this.page
    this.perPage = pagination.perPage || this.perPage
    this.lastPage = pagination.lastPage
    this.items = pagination.items

    // this will allow return to page where we last time left
    this.route.params
      ? (this.route.params.page = this.page)
      : (this.route.params = {
          direction: this.direction,
          page: this.page,
          perPage: this.perPage,
          sort: this.sort,
        })
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

// tslint:disable:object-literal-sort-keys
import Vue from "vue"
import { RawLocation, Route } from "vue-router"

import { CreatePagination, IPagingItem } from "$/table"
import { log } from "@/help"
import { Utils } from "@/Utils"

import { Direction, IPaginationBaseOptions } from "../../../types"

import { Paging } from "./Paging"
export { Paging } from "./Paging"

type Next = (to?: RawLocation | false | ((vm: Vue) => any) | void) => void

export const createPaging = <T extends IPagingItem>(
  callback: CreatePagination<T>, {
    activeClass = "active table-active",
    disabledClass = "disabled",
    perPage = 10,
    perPageOptions = [5, 10, 20, 50, 100],
    show = 5,
    sortBy = "id",
    sortDirection = "desc",
  }: IPaginationBaseOptions = {
      activeClass: "active table-active",
      disabledClass: "disabled",
      perPage: 10,
      perPageOptions: [5, 10, 20, 50, 100],
      show: 5,
      sortBy: "id",
      sortDirection: "desc",
    }) => {
  const options = {
    activeClass,
    disabledClass,
    perPage,
    perPageOptions,
    show,
    sortBy,
    sortDirection: sortDirection as Direction,
  }

  const pagination = new Paging<T>(options)

  function update(route: Route, from: Route, onEnter = false) {
    let hasChanged = false

    if (route.params.sort !== pagination.sort) {
      pagination.sort = route.params.sort || pagination.sort
      hasChanged = hasChanged || !onEnter || !route.params.sort
      log("debug", "pagination-mixin parameter-update", { hasChanged, sort: pagination.sort })
    }

    if (route.params.direction !== pagination.direction) {
      const direction = (
        route.params.direction ?
          route.params.direction :
          pagination.direction
      ) === "asc" ? "asc" : "desc"

      pagination.direction = direction
      hasChanged = hasChanged || !onEnter || !route.params.direction
      log("debug", "pagination-mixin parameter-update", {
        hasChanged,
        direction: pagination.direction,
      })
    }

    if (route.params.page !== pagination.page.toString()) {
      const page = parseInt(route.params.page, 10) || pagination.page
      pagination.page = page
      hasChanged = hasChanged || !onEnter || !route.params.page
      log("debug", "pagination-mixin parameter-update", { hasChanged, page: pagination.page })
    }

    const pagingPerPage = pagination.perPage.toString()

    if (
      Utils.isDefined(from.params.perPage) &&
      from.params.perPage !== route.params.perPage &&
      route.params.page !== "1" &&
      !onEnter
    ) {
      // When changing per page value it is possible to occur on a page without
      // data. For this reason we need redirect user back to the first page.

      pagination.page = 1
      hasChanged = true

      log("debug", "pagination-mixin parameter-update", {
        hasChanged,
        page: pagination.page,
        fromPerPage: from.params.perPage,
        routePerPage: route.params.perPage
      })
    }

    if (route.params.perPage !== pagingPerPage) {
      const perPage2 = parseInt(route.params.perPage, 10) || pagination.perPage
      pagination.perPage = perPage2
      hasChanged = hasChanged || !onEnter || !perPage2
      log("debug", "pagination-mixin parameter-update", { hasChanged, perPage: pagination.perPage })
    }

    return {
      hasChanged,
      hash: route.hash,
      name: route.name,
      params: {
        ...route.params,
        direction: pagination.direction,
        page: pagination.page.toString(),
        perPage: pagination.perPage.toString(),
        sort: pagination.sort,
      },
      path: route.path,
      query: route.query,
    }
  }

  function onRouteChange(to: Route, from: Route, next: Next, onEnter = false): void {
    // Make sure we read route parameters and set them to pagination before
    // we start fetching data from server.
    const target = update(to, from, onEnter)
    log("debug", "pagination-mixin onRouteChange", { to, from, onEnter, target })

    if (target.hasChanged) {
      log("debug", "pagination-mixin updating route")
      next(target)
      return
    }

    // Only when route is ready and matches current pagination data start
    // fetching data from server.
    log("debug", "pagination-mixin calling data loading")
    callback(pagination, to, from)
      .then(results => {
        log("debug", "pagination-mixin updating pagination", { results })
        pagination.update(results)
        next()
      })
  }

  return {
    mixin: Vue.extend({
      beforeRouteEnter(to, from, next) {
        // Called before the route that renders this component is confirmed.
        // Does NOT have access to `this` component instance,
        // because it has not been created yet when this guard is called!
        log("debug", "pagination-mixin beforeRouteEnter()", { to, from })
        onRouteChange(to, from, next, true)
      },

      beforeRouteUpdate(to, from, next) {
        // Called when the route that renders this component has changed, but
        // this component is reused in the new route.
        // For example, for a route with dynamic params `/foo/:id`, when we
        // navigate between `/foo/1` and `/foo/2`, the same `Foo` component
        // instance will be reused, and this hook will be called when that
        // happens. Has access to `this` component instance.
        log("debug", "pagination-mixin beforeRouteUpdate()", { to, from })
        onRouteChange(to, from, next)
      },
    }),
    paging: pagination,
  }
}

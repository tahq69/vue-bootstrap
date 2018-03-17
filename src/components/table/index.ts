import Vue from "vue"
import { RawLocation, Route } from "vue-router"
import { Paging } from "./Paging"

import { CreatePagination, IPagingItem } from "$/table"

export { Paging } from "./Paging"

type Next = (to?: RawLocation | false | ((vm: Vue) => any) | void) => void

export const createPaging = <T extends IPagingItem>(callback: CreatePagination<T>) => {
  const pagination = new Paging<T>()

  function update(route: Route, from: Route, onEnter = false) {
    let hasChanged = false

    if (route.params.sort !== pagination.sort) {
      pagination.sort = route.params.sort || pagination.sort
      hasChanged = hasChanged || !onEnter || !route.params.sort
    }

    if (route.params.direction !== pagination.direction) {
      const direction = (
        route.params.direction ?
          route.params.direction :
          pagination.direction
      ) === "asc" ? "asc" : "desc"

      pagination.direction = direction
      hasChanged = hasChanged || !onEnter || !route.params.direction
    }

    if (route.params.page !== pagination.page.toString()) {
      const page = parseInt(route.params.page, 10) || pagination.page
      pagination.page = page
      hasChanged = hasChanged || !onEnter || !route.params.page
    }

    const pagingPerPage = pagination.perPage.toString()

    if (
      from.params.perPage !== route.params.perPage &&
      route.params.page !== "1" &&
      !onEnter
    ) {
      // When changing per page value it is possible to occur on a page without
      // data. For this reason we need redirect user back to the first page.

      pagination.page = 1
      hasChanged = true
    }

    if (route.params.perPage !== pagingPerPage) {
      const perPage = parseInt(route.params.perPage, 10) || pagination.perPage
      pagination.perPage = perPage
      hasChanged = hasChanged || !onEnter || !perPage
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

    if (target.hasChanged) {
      next(target)
      return
    }

    // Only when route is ready and matches current pagination data start
    // fetching data from server.
    callback(pagination, to, from)
      .then(results => pagination.update(results) && next())
  }

  return {
    mixin: Vue.extend({
      beforeRouteEnter(to, from, next) {
        // Called before the route that renders this component is confirmed.
        // Does NOT have access to `this` component instance,
        // because it has not been created yet when this guard is called!
        onRouteChange(to, from, next, true)
      },

      beforeRouteUpdate(to, from, next) {
        // Called when the route that renders this component has changed, but
        // this component is reused in the new route.
        // For example, for a route with dynamic params `/foo/:id`, when we
        // navigate between `/foo/1` and `/foo/2`, the same `Foo` component
        // instance will be reused, and this hook will be called when that
        // happens. Has access to `this` component instance.
        onRouteChange(to, from, next)
      },
    }),
    paging: pagination,
  }
}

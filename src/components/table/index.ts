import Vue from "vue"
import { Route } from "vue-router"
import { Paging } from "./Paging"

import { CreatePagination, IPagingItem } from "$/table"

export { Paging } from "./Paging"

export const createPaging = <T extends IPagingItem>(callback: CreatePagination<T>) => {
  const pagination = new Paging<T>()

  function update(route: Route): boolean {
    let hasChanged = false
    if (route.params.sort && pagination.sort !== route.params.sort) {
      pagination.sort = route.params.sort
      hasChanged = true
    }

    if (route.params.direction) {
      const direction = route.params.direction === "asc" ? "asc" : "desc"
      if (direction !== pagination.direction) {
        pagination.direction = direction
        hasChanged = true
      }
    }

    if (route.params.perPage) {
      const perPage = parseInt(route.params.perPage, 10)
      if (perPage !== pagination.perPage) {
        pagination.perPage = perPage
        hasChanged = true
      }
    }

    if (route.params.page) {
      const page = parseInt(route.params.page, 10)
      if (page !== pagination.page) {
        pagination.page = page
        hasChanged = true
      }
    }

    return hasChanged
  }

  return {
    mixin: Vue.extend({
      beforeRouteEnter(to, from, next) {
        // Called before the route that renders this component is confirmed.
        // Does NOT have access to `this` component instance,
        // because it has not been created yet when this guard is called!

        // Make sure we read route parameters and set them to pagination before
        // we start fetching data from server.
        update(to)

        callback(pagination).then(results => pagination.update(results) && next())
      },

      beforeRouteUpdate(to, from, next) {
        // Called when the route that renders this component has changed, but
        // this component is reused in the new route.
        // For example, for a route with dynamic params `/foo/:id`, when we
        // navigate between `/foo/1` and `/foo/2`, the same `Foo` component
        // instance will be reused, and this hook will be called when that
        // happens. Has access to `this` component instance.

        // Route may change not only for pagination rules, but for some custom
        // developer use case. In thous cases we may not need to fetch data
        // from server.
        if (update(to)) {
          callback(pagination).then(results => pagination.update(results) && next())
          return
        }

        next()
      },
    }),
    paging: pagination,
  }
}

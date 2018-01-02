<script lang="ts">
import Vue from "vue"
import { Route } from "vue-router"

import { Direction } from "$/table"

import Paging from "./Paging"

export default Vue.extend({
  name: "GridHeader",

  props: {
    column: { type: String, required: true },
    paging: { type: Paging, required: true },
  },

  computed: {
    direction(): Direction {
      return this.paging.direction === "asc" ? "asc" : "desc"
    },

    isEnabled(): boolean {
      return this.column === this.paging.sort
    },

    route(): Route {
      const route = JSON.parse(JSON.stringify(this.paging.route))
      let direction = "desc"

      if (this.isEnabled) {
        // Setup oposite route direction if this header is already enabled.
        direction = this.direction === "desc" ? "asc" : "desc"
      }

      if (!route.params) {
        route.params = {
          direction,
          page: this.paging.page,
          perPage: this.paging.perPage,
          sort: this.column,
        }
      } else {
        route.params.page = this.paging.page
        route.params.sort = this.column
        route.params.direction = direction
        route.params.perPage = this.paging.perPage
      }

      return route
    },
  },

  methods: {
    change(e: Event) {
      this.$el.blur()
      this.$emit("change", this.route.params)
    },
  },
})
</script>

<template>
  <th class="crip-sort-th"
      nowrap>
    <router-link :to="route"
                 @click.native="change($event)"
                 class="crip-sort-th-anchor clearfix">
      <slot/>

      <span class="crip-caret"
            v-if="isEnabled">
        <span v-if="direction == 'asc'"
              class="glyphicon glyphicon-triangle-bottom"></span>
        <span v-else
              class="glyphicon glyphicon-triangle-top"></span>
      </span>
    </router-link>
  </th>
</template>

<style lang="scss">
.table .crip-sort-th {
  padding: 0;

  .crip-sort-th-anchor {
    padding: 8px 25px 8px 8px;
    display: block;
    height: 100%;
    cursor: pointer;
    position: relative;

    &:hover {
      background-color: rgba(200, 200, 200, 0.3);
    }
  }

  .crip-caret {
    position: absolute;
    right: 8px;
  }
}
</style>

<script lang="ts">
import Vue from "vue"

import CPanel from "@/components/panel/Panel.vue"
import CPagination from "./Pagination.vue"
import CPerPage from "./PerPage.vue"

import { Paging } from "./Paging"

export default Vue.extend({
  name: "Grid",

  components: { CPanel, CPagination, CPerPage },

  props: {
    paging: { type: Paging, required: true },
    showHeading: { type: Boolean, default: true },
    type: { type: String, default: "default" },
  },
})
</script>

<template>
  <!--v-loading="paging.loading"-->
  <c-panel :show-footer="true"
           :show-body="false"
           :show-heading="showHeading"
           :type="type">

    <span slot="title">
      <slot name="title"></slot>
    </span>

    <span slot="actions">
      <slot name="actions"></slot>
    </span>

    <div slot="pre-body"
         class="grid-placeholder table-responsive">
      <slot></slot>
    </div>

    <div slot="footer"
         class="clearfix">
      <c-pagination :paging="paging"
                    class="pull-left"></c-pagination>
      <c-per-page :paging="paging"
                  class="pull-right"></c-per-page>
    </div>

  </c-panel>
</template>

<style lang="scss">
.panel-body .pagination,
.grid-placeholder .table {
  margin: 0;
}

.crip-table-row {
  .actions {
    visibility: hidden;
  }

  &:hover .actions,
  &.active .actions {
    visibility: visible;
  }
}
</style>

<script lang="ts">
import Vue from "vue"

import CCard from "@/components/card/Card.vue"
import CPagination from "./Pagination.vue"
import CPerPage from "./PerPage.vue"

import { Paging } from "./Paging"

export default Vue.extend({
  name: "Grid",

  components: { CCard, CPagination, CPerPage },

  props: {
    paging: { type: Paging, required: true },
    showHeading: { type: Boolean, default: true },
    type: { type: String, default: "" },
  },
})
</script>

<template>
  <!--v-loading="paging.loading"-->
  <CCard :show-footer="true"
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
      <CPagination :paging="paging"
                   class="float-left"></CPagination>
      <CPerPage :paging="paging"
                class="float-right"></CPerPage>
    </div>

  </CCard>
</template>

<style lang="scss">
.card-body .pagination,
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

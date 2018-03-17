<script lang="ts">
import Vue from "vue"

import { throws } from "assert"
import { Paging } from "./Paging"

export default Vue.extend({
  name: "PerPage",

  props: {
    paging: { type: Paging, required: true },
  },

  methods: {
    onChange(val: number) {
      this.$router.push({
        ...this.paging.route,
        page: 1,
        perPage: val,
      } as any)
      this.$emit("change", val)

      // tslint:disable-next-line
      ;(this.$refs.select as any).blur()
    },
  },
})
</script>

<template>
  <div>
    <select class="form-control"
            ref="select"
            v-model="paging.perPage"
            @change="onChange($event.target.value)">
      <option v-for="option in paging.perPageOptions"
              :value="option"
              :key="option">
        {{ option }}
      </option>
    </select>
  </div>
</template>


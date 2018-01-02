<script lang="ts">
import Vue from "vue"

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
        perPage: val,
      } as any)
      this.$emit("change", val)
    },
  },
})
</script>

<template>
  <div>
    <select class="form-control"
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


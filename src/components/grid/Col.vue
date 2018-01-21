<script lang="ts">
import Vue from "vue"

export default Vue.extend({
  name: "Col",

  props: {
    xl: { type: Number, default: 0 },
    lg: { type: Number, default: 0 },
    md: { type: Number, default: 0 },
    sm: { type: Number, default: 0 },
    xs: { type: Number, default: 0 },

    offsetXl: { type: Number, default: 0 },
    offsetLg: { type: Number, default: 0 },
    offsetMd: { type: Number, default: 0 },
    offsetSm: { type: Number, default: 0 },
    offsetXs: { type: Number, default: 0 },
  },

  computed: {
    classes(): string[] {
      const result = ["crip-col", "col"]
      if (this.lg > 0) result.push(`col-lg-${this.lg}`)
      if (this.offsetLg > 0) result.push(`offset-lg-${this.offsetLg}`)

      if (this.md > 0) result.push(`col-md-${this.md}`)
      if (this.offsetMd > 0) result.push(`offset-md-${this.offsetMd}`)

      if (this.sm > 0) result.push(`col-sm-${this.sm}`)
      if (this.offsetSm > 0) result.push(`offset-sm-${this.offsetSm}`)

      if (this.xs > 0) result.push(`col-${this.xs}`)
      if (this.offsetXs > 0) result.push(`offset-${this.offsetXs}`)
      return result
    },
  },
})
</script>

<template>
  <div :class="classes">
    <slot/>
  </div>
</template>


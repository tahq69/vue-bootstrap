<script lang="ts">
import Vue from "vue"

const typeValues = [
  "", "primary", "secondary", "success", "danger", "warning", "info", "light",
  "dark",
]
const typeValid = (value: string) => typeValues.indexOf(value) > -1

export default Vue.extend({
  name: "Card",

  props: {
    showBody: { type: Boolean, default: true },
    showFooter: { type: Boolean, default: false },
    showHeader: { type: Boolean, default: true },
    type: { type: String, default: "", validator: typeValid },
  },

  computed: {
    headerStyles(): any {
      return [
        {
          "text-white": this.type !== "light" && this.type !== "",
          [`bg-${this.type}`]: this.type !== "",
        },
        "card-header", "clearfix"
      ]
    }
  }
})
</script>

<template>
  <div :class="[
         {
           [`card-${type}`]: !!type,
           [`border-${type}`]: !!type,
         },
         'card', 'crip-card', 'mb-3',
       ]">

    <div v-if="showHeader"
         :class="headerStyles">

      <h5 class="crip-card-title float-left m-0">
        <slot name="title"><!-- title slot --></slot>
      </h5>

      <div class="crip-card-actions float-right">
        <slot name="actions"><!-- actions slot --></slot>
      </div>

    </div>

    <!-- pre-body slot -->
    <slot name="pre-body" />

    <div class="card-body"
         v-if="showBody">
      <!-- default slot -->
      <slot/>
    </div>

    <!-- post-body slot -->
    <slot name="post-body" />

    <div v-if="showFooter"
         class="card-footer">
      <!-- footer slot -->
      <slot name="footer" />
    </div>

  </div>
</template>

<style lang="scss" scoped>
.crip-card {
  .crip-card-actions {
    margin: -4px;
  }
}
</style>


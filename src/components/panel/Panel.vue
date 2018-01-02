<script lang="ts">
import Vue from "vue"

const typeValues = ["default", "primary", "success", "info", "warning", "danger"]
const typeValid = (value: string) => typeValues.indexOf(value) > -1

export default Vue.extend({
  name: "Panel",

  props: {
    showBody: { type: Boolean, default: true },
    showFooter: { type: Boolean, default: false },
    showHeading: { type: Boolean, default: true },
    type: { type: String, default: "default", validator: typeValid },
  },
})
</script>

<template>
  <div :class="[`panel-${type}`, 'panel', 'crip-panel']">

    <div v-if="showHeading"
         class="panel-heading clearfix">

      <div class="v-panel-title pull-left">
        <!-- title slot -->
        <slot name="title" />
      </div>

      <div class="v-panel-title pull-right">
        <!-- actions slot -->
        <slot name="actions" />
      </div>

    </div>

    <!-- pre-body slot -->
    <slot name="pre-body" />

    <div class="panel-body"
         v-if="showBody">
      <!-- default slot -->
      <slot/>
    </div>

    <!-- post-body slot -->
    <slot name="post-body" />

    <div v-if="showFooter"
         class="panel-footer">
      <!-- footer slot -->
      <slot name="footer" />
    </div>

  </div>
</template>

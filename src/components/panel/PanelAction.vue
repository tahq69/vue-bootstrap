<script lang="ts">
import Vue from "vue"

const typeValues = ["", "default", "primary", "success", "info", "warning", "danger", "link"]
const typeValid = (value: string) => typeValues.indexOf(value) > -1

const sizeValues = ["", "lg", "md", "sm", "xs"]
const sizeValid = (value: string) => sizeValues.indexOf(value) > -1

export default Vue.extend({
  name: "PanelAction",

  props: {
    to: { default: "" },
    type: { type: String, default: "default", validator: typeValid },
    size: { type: String, default: "xs", validator: sizeValid },
  },
})
</script>

<template>
  <router-link :to="to"
               :class="{
                 [`btn-${type}`]: !!type,
                 [`btn-${size}`]: !!size
               }"
               class="btn">
    <!-- default slot -->
    <slot/>
  </router-link>
</template>

<script lang="ts">
import Vue from "vue"

const typeValues = [
  "", "primary", "secondary", "success", "danger", "warning", "info", "light",
  "dark", "link",
]
const typeValid = (value: string) => typeValues.indexOf(value) > -1

const sizeValues = ["", "lg", "sm"]
const sizeValid = (value: string) => sizeValues.indexOf(value) > -1

export default Vue.extend({
  name: "CardAction",

  props: {
    size: { type: String, default: "sm", validator: sizeValid },
    to: { default: "" },
    type: { type: String, default: "light", validator: typeValid },
  },
})
</script>

<template>
  <router-link :to="to"
               :class="{
                 'btn': true,
                 'crip-btn': true,
                 [`btn-${type}`]: !!type,
                 [`btn-${size}`]: !!size
               }">
    <slot><!-- default slot --></slot>
  </router-link>
</template>

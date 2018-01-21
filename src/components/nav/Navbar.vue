<script lang="ts">
import Vue from "vue"

export default Vue.extend({
  name: "Navbar",

  props: {
    containered: { type: Boolean, default: false },
    left: { type: Array, default: () => [] },
    right: { type: Array, default: () => [] },
  },

  computed: {
    hasLeftMenu(): boolean {
      return this.left.length > 0
    },

    hasRightMenu(): boolean {
      return this.right.length > 0
    },
  },
})
</script>

<template>
  <nav class="crip-navbar navbar navbar-expand navbar-dark bg-primary">
    <div :class="{
           'container': containered,
           'container-fluid': !containered
         }">
      <slot><!-- default slot for navbar-brand --></slot>

      <div class="collapse navbar-collapse">
        <!-- Left Side Of Navbar -->
        <c-navbar-items v-if="hasLeftMenu"
                        :items="left"
                        class="navbar-nav mr-auto" />

        <!-- Right Side Of Navbar -->
        <c-navbar-items v-if="hasRightMenu"
                        :items="right"
                        class="navbar-nav" />
      </div>
    </div>
  </nav>
</template>

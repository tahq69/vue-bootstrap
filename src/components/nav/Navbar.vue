<script lang="ts">
import Vue from "vue"

export default Vue.extend({
  name: "Navbar",

  props: {
    left: { type: Array, default: () => [] },
    right: { type: Array, default: () => [] },
    containered: {type: Boolean, default: true},
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
  <nav class="navbar navbar-default navbar-static-top crip-navbar">
    <div :class="{container: containered}">
      <div class="navbar-header">

        <!-- Collapsed Hamburger -->
        <button type="button"
                class="navbar-toggle collapsed"
                data-toggle="collapse"
                data-target="#app-navbar-collapse">
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>

        <!-- Branding Image -->
        <slot/>
      </div>

      <div id="app-navbar-collapse"
           class="collapse navbar-collapse">
        <!-- Left Side Of Navbar -->
        <c-navbar-items v-if="hasLeftMenu"
                        :items="left"
                        class="nav navbar-nav" />

        <!-- Right Side Of Navbar -->
        <c-navbar-items v-if="hasRightMenu"
                        :items="right"
                        class="nav navbar-nav navbar-right" />
      </div>
    </div>
  </nav>
</template>

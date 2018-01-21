<script lang="ts">
import Vue from "vue"

import CClickOutside from "@/directives/ClickOutside"

export default Vue.extend({
  name: "NavbarGroup",

  directives: { CClickOutside },

  props: {
    item: { type: Object, required: true },
    items: { type: Array, default: () => [] },
    submenu: { type: Boolean, default: false },
  },

  computed: {
    hasItems(): boolean {
      return this.items.length > 0
    },
  },

  data() {
    return {
      isOpen: false,
    }
  },

  methods: {
    dropdownToggle() {
      this.isOpen = !this.isOpen
    },

    dropdownHide() {
      this.isOpen = false
    },
  },
})
</script>

<template>
  <div :class="{
        'dropdown': !submenu,
        'dropdown-submenu': submenu,
        'dropdown-item': submenu,
        'show': isOpen,
        'nav-item': !submenu,
      }"
      v-c-click-outside="dropdownHide">
    <a href
       @click.prevent="dropdownToggle"
       :class="[{'nav-link': !submenu}, 'dropdown-toggle', 'd-block']">
      {{ item.text }}
    </a>

    <c-navbar-items v-if="hasItems"
                    :items="items"
                    :submenu="true"
                    :class="{'show': isOpen}"
                    class="dropdown-menu" />
  </div>
</template>

<style lang="scss">
.dropdown-submenu {
  position: relative;

  .dropdown-menu {
    top: 0;
    left: 100%;
    margin-top: -1px;
  }
}
</style>


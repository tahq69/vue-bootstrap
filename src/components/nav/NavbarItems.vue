<script lang="ts">
import Vue from "vue"

import CNavbarGroup from "./NavbarGroup.vue"
import CNavbarItem from "./NavbarItem.vue"

export default Vue.extend({
  name: "NavbarItems",

  components: { CNavbarItem, CNavbarGroup },

  props: {
    items: { type: Array, default: () => [] },
    submenu: { type: Boolean, required: false },
  },
})
</script>

<template>
  <ul>
    <template v-for="item in items">
      <c-navbar-item v-if="!item.items"
                     :item="item"
                     :key="item.key" />
      <c-navbar-group v-else
                      :item="item.parent"
                      :items="item.items"
                      :submenu="submenu"
                      :key="item.key" />
    </template>
  </ul>
</template>

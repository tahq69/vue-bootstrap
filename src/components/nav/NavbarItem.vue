<script lang="ts">
import Vue from "vue"

export default Vue.extend({
  name: "NavbarItem",

  props: {
    item: { type: Object, required: true },
    submenu: { type: Boolean, default: false },
  },

  computed: {
    classes(): { [ker: string]: boolean } {
      const hasAction = this.item.route || this.item.href || this.item.click || this.item.divider
      const isNavItem = hasAction && !this.item.divider && !this.submenu

      return {
        active: this.item.isActive,
        "dropdown-divider": this.item.divider,
        "dropdown-header": !hasAction,
        "dropdown-item": this.submenu && hasAction && !this.item.divider,
        "nav-item": isNavItem,
        "nav-link": isNavItem,
      }
    },
  },
})
</script>

<template>
  <router-link v-if="item.route"
               :to="item.route"
               active-class="active"
               :class="classes"
               v-html="item.text" />

  <a v-else-if="!item.route && item.href"
     :href="item.href"
     v-html="item.text"
     :target="item.target"
     :class="classes" />

  <a v-else-if="!item.route && item.click"
     @click.prevent="item.click"
     v-html="item.text"
     :class="classes"
     href />

  <div v-else
       :class="classes"
       v-html="item.text" />
</template>

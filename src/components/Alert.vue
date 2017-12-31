<script lang="ts">
import Vue from "vue"

const typeValues = ["success", "info", "warning", "danger"]
const typeValid = (value: string) => typeValues.indexOf(value) > -1

export default Vue.extend({
  name: "Alert",

  props: {
    isVisible: { type: Boolean, default: true },
    type: { default: "danger", type: String, validator: typeValid },
  },

  data() {
    return {
      visible: false,
    }
  },

  methods: {
    hide() {
      this.visible = false
      this.$emit("update:isVisible", false)
      this.$emit("hide")
    },
  },

  mounted() {
    this.visible = this.isVisible
  },

  watch: {
    isVisible(value: boolean) {
      this.visible = value
    },
  },
})
</script>

<template>
  <div v-if="visible">
    <div class="alert alert-dismissible"
         :class="[`alert-${type}`]">
      <button type="button"
              class="close"
              @click="hide">
        &times;
      </button>

      <slot/>

    </div>
  </div>
</template>

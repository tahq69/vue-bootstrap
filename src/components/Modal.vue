<script lang="ts">
import Vue from "vue"

export default Vue.extend({
  name: "Modal",

  props: {
    isVisible: { type: Boolean, required: true },
    size: {
      default: "",
      type: String,
      validator: (value: string) => ["", "sm", "lg"].indexOf(value) > -1,
    },
  },

  // data: () => ({ isVisible: false }),

  computed: {
    modalStyles(): any {
      const result: any = {}

      if (this.isVisible) result.display = "block"

      return result
    },

    dialogClass(): string {
      return this.size !== "" ? `modal-${this.size}` : ""
    },

    hasHeader(): boolean {
      return !!this.$slots.title
    },

    hasFooter(): boolean {
      return !!this.$slots.footer
    },
  },

  methods: {
    showBackdrop() {
      const backdrop = document.createElement("div")
      backdrop.className = "modal-backdrop fade show"

      document.body.appendChild(backdrop)
      document.body.className = "modal-open"
      document.body.style.paddingRight = "17px"
    },

    hideBackdrop() {
      const backdrop = document.getElementsByClassName("modal-backdrop")[0]
      if (backdrop) {
        document.body.removeChild(backdrop)
        document.body.className = ""
        document.body.style.paddingRight = ""
      }
    },
  },

  mounted() {
    if (this.isVisible) this.showBackdrop()
  },

  watch: {
    isVisible(isVisible: boolean) {
      if (isVisible) this.showBackdrop()
      else this.hideBackdrop()
    },
  },
})
</script>

<template>

  <div class="modal crip-modal fade"
       :class="{'show': isVisible}"
       :style="modalStyles"
       @click="$emit('update:isVisible', false)"
       tabindex="-1">
    <div class="modal-dialog"
         :class="dialogClass">
      <div class="modal-content"
           @click="$event.stopPropagation()">

        <div class="modal-header"
             v-if="hasHeader">
          <h5 class="modal-title">
            <slot name="title" />
          </h5>

          <button type="button"
                  @click="$emit('update:isVisible', false)"
                  class="close">
            <span>&times;</span>
          </button>
        </div>

        <div class="modal-body">
          <slot />
        </div>

        <div class="modal-footer"
             v-if="hasFooter">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </div>
</template>


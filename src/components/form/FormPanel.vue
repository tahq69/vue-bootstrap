<script lang="ts">
import Vue from "vue"

import { ColCalculator as Cols, ColSizes } from "@/ColCalculator"
import { IClasses } from "@/types"
import { Utils } from "@/Utils"
import { Form } from "./Form"

export default Vue.extend({
  name: "FormPanel",

  props: {
    lg: { type: Number, default: 0 },
    md: { type: Number, default: 0 },
    sm: { type: Number, default: 0 },
    xs: { type: Number, default: 12 },

    form: { type: Object, default: () => new Form({ __: false }) },
    title: { type: String, required: true },
  },

  data() {
    return {
      showError: false,
    }
  },

  computed: {
    sizes(): ColSizes {
      return {
        lg: this.lg,
        md: this.md,
        sm: this.sm,
        xs: this.xs,
      }
    },

    contentClass(): string[] {
      return Cols.getClasses("control", this.sizes, [], true, true)
    },

    elementClass(): string[] {
      const classes: string[] = []
      if (this.hasErrors) classes.push("has-data-errors")
      if (this.hasError) classes.push("has-global-error")
      return classes
    },

    hasErrors(): boolean {
      return this.form.hasErrors
    },

    hasError(): boolean {
      return this.form.hasUnknownError
    },

    error(): string {
      return this.form.unknownError
    },
  },

  methods: {
    submit() {
      this.$emit("submit")
    },
  },

  watch: {
    hasError(value: boolean, oldValue: boolean) {
      if (!oldValue && value) {
        this.showError = true
      }

      if (oldValue && !value) {
        this.showError = false
      }
    },
  },
})
</script>

<template>
  <form @submit.prevent="submit"
        :class="elementClass"
        class="crip-form-panel form-horizontal">

    <c-panel>
      <span slot="title">{{ title }}</span>
      <span slot="actions">
        <slot name="actions"></slot>
      </span>

      <c-row>
        <c-col v-if="showError">
          <c-alert :is-visible.sync="showError">
            {{ error }}
          </c-alert>
        </c-col>

        <div :class="contentClass">
          <slot/>
        </div>
      </c-row>
    </c-panel>
  </form>
</template>

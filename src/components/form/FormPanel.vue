<script lang="ts">
import Vue from "vue"

import Cols, { ColSizes } from "@/ColCalculator"
import { IClasses } from "@/types"
import Utils from "@/Utils"
import Form from "./Form"

export default Vue.extend({
  name: "FormPanel",

  props: {
    bodyLg: { type: Number, default: 0 },
    bodyMd: { type: Number, default: 0 },
    bodySm: { type: Number, default: 0 },
    bodyXs: { type: Number, default: 12 },
    lg: { type: Number, default: 0 },
    md: { type: Number, default: 0 },
    sm: { type: Number, default: 0 },
    xs: { type: Number, default: 12 },
    form: { type: Form, default: new Form({ __: false }) },
    title: { type: String, required: true },
  },

  data() {
    return {
      showError: false,
    }
  },

  computed: {
    bodySizes(): ColSizes {
      return {
        lg: this.bodyLg,
        md: this.bodyMd,
        sm: this.bodySm,
        xs: this.bodyXs,
      }
    },

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
      const initial: string[] = []
      if (this.hasErrors) initial.push("has-data-errors")
      if (this.hasError) initial.push("has-global-error")

      return Cols.getClasses("control", this.bodySizes, initial, true, true)
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
      <slot slot="actions"
            name="actions"></slot>

      <c-row>
        <c-col :is-visible.sync="showError">
          <c-alert>
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

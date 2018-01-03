<script lang="ts">
import Vue from "vue"

import CAlert from "@/components/Alert.vue"
import CCol from "@/components/grid/Col.vue"
import CRow from "@/components/grid/Row.vue"
import CPanel from "@/components/panel/Panel.vue"

import { ColCalculator as Cols, ColSizes } from "@/ColCalculator"
import { IClasses } from "@/types"
import { Utils } from "@/Utils"
import { Form } from "./Form"

export default Vue.extend({
  name: "FormPanel",

  components: { CAlert, CCol, CPanel, CRow },

  props: {
    lg: { type: Number, default: 0 },
    md: { type: Number, default: 0 },
    sm: { type: Number, default: 0 },
    xs: { type: Number, default: 12 },

    bodyLg: { type: Number, default: 0 },
    bodyMd: { type: Number, default: 0 },
    bodySm: { type: Number, default: 0 },
    bodyXs: { type: Number, default: 12 },

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

    bodySizes(): ColSizes {
      return {
        lg: this.bodyLg,
        md: this.bodyMd,
        sm: this.bodySm,
        xs: this.bodyXs,
      }
    },

    bodyClasses(): string[] {
      return Cols.getClasses("control", this.bodySizes, [], true, true)
    },

    classes(): string[] {
      const classes = Cols.getClasses("control", this.sizes, [], true, true)
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
        :class="classes"
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

        <div :class="bodyClasses">
          <slot/>
        </div>
      </c-row>
    </c-panel>
  </form>
</template>

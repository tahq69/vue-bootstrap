<script lang="ts">
import Vue from "vue"

import { ColCalculator as Cols, ColSizes } from "@/ColCalculator"
import { Utils } from "@/Utils"

import { Form } from "./Form"
import FormErrors from "./FormErrors.vue"

export default Vue.extend({
  name: "FormGroup",

  components: { FormErrors },

  props: {
    lg: { type: Number, default: 0 },
    md: { type: Number, default: 10 },
    sm: { type: Number, default: 8 },
    xs: { type: Number, default: 12 },

    errors: { type: Array, default: () => [] },
    for: { type: String },
    form: { type: Object, default: () => new Form({ __: false }) },
    label: { type: String, default: "" },
  },

  computed: {
    id(): string {
      return this.for || ""
    },

    sizes(): ColSizes {
      return {
        lg: this.lg,
        md: this.md,
        sm: this.sm,
        xs: this.xs,
      }
    },

    labelClass(): string[] {
      return Cols.getClasses("label", this.sizes, ["control-label"])
    },

    controlClass(): string[] {
      const includeOffset = this.label === ""
      return Cols.getClasses("control", this.sizes, [], includeOffset)
    },

    formErrors(): string[] {
      if (Utils.isDefined(this.form.data.__) && this.form.data.__ === false) {
        return this.errors
      }

      return this.form.errors[this.for] || []
    },

    hasErrors(): boolean {
      return this.formErrors.length > 0
    },
  },

  methods: {},
})
</script>

<template>
  <div :class="{'has-error': hasErrors}"
       class="form-group crip-form-group">
    <label v-if="label"
           :for="id"
           :id="`${id}-label`"
           :class="labelClass">
      {{ label }}
    </label>
    <div :class="controlClass">
      <slot/>
      <form-errors :errors="formErrors" />
    </div>
  </div>
</template>

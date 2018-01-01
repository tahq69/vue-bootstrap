<script lang="ts">
import Vue from "vue"

import CripBootstrap, { Form } from "@/main"
import CodeSample from "./CodeSample.vue"
import ExampleSection from "./ExampleSection.vue"

export default Vue.extend({
  name: "FormComponents",

  components: { ExampleSection, CodeSample },

  data() {
    return {
      form: new Form({ val1: "" }),
    }
  },

  methods: {
    addError() {
      this.form.addErrors("Some global error to show up as alert")
      this.form.addErrors({ val1: ["Some error 1", "Some error 2"] })
    },

    removeError() {
      this.form.clearErrors()
    },

    save() {
      this.form.clearErrors()
      alert(`Form submitted. Val1: ${this.form.data.val1}`)
    },
  },
})
</script>

<template>
  <div>
    <example-section title="Form components">
      <c-row>
        <c-col>
          <p>
            Panel component wrapped in to form with form group.
          </p>

          <button class="btn btn-danger"
                  @click="addError()">Show form error</button>
          <button class="btn btn-success"
                  @click="removeError()">Hide form error</button>
        </c-col>
      </c-row>
      <hr>
      <c-row>
        <c-col>
          <c-form-panel title="Form title"
                        :form="form"
                        @submit="save">

            <c-form-group :errors="form.errors.val1"
                          label="Val1:"
                          for="val1">
              <input type="text"
                     id="val1"
                     v-model="form.data.val1"
                     class="form-control">
            </c-form-group>

            <c-form-group>
              <input type="submit"
                     class="btn btn-primary">
            </c-form-group>

          </c-form-panel>
        </c-col>
      </c-row>

      <code-sample>
        import Vue from "vue"
        import CripBootstrap from "crip-vue-bootstrap"

        Vue.use(CripBootstrap)

        Vue.extend({
          template: `
            &lt;crip-form-panel title="Form title"
                             :form="form"
                             @submit="save"&gt;

              &lt;crip-form-group :errors="form.errors.val1"
                               label="Val1:"
                               for="val1"&gt;
                &lt;input type="text"
                       id="val1"
                       v-model="form.data.val1"
                       class="form-control"&gt;
              &lt;/crip-form-group&gt;

              &lt;crip-form-group&gt;
                &lt;input type="submit"
                       class="btn btn-primary"&gt;
              &lt;/crip-form-group&gt;

            &lt;/crip-form-panel&gt;
          `,

          data() {
            return {
              form: new Form({ val1: "" }),
            }
          },

          save() {
            this.form.clearErrors()
            alert(`Form submitted. Val1: ${this.form.data.val1}`)
          },
        })
      </code-sample>
    </example-section>
  </div>
</template>

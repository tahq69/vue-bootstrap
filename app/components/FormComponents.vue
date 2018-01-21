<script lang="ts">
import Vue from "vue"

import Crip from "@/main"
import CodeSample from "./CodeSample.vue"
import ExampleSection from "./ExampleSection.vue"

export default Vue.extend({
  name: "FormComponents",

  components: { ExampleSection, CodeSample },

  data() {
    return {
      form: new Crip.Form({ val1: "" }),
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
      <crip-row>
        <crip-col>
          <p>
            Panel component wrapped in to form with form group.
          </p>

          <button class="btn btn-danger"
                  @click="addError()">Show form error</button>
          <button class="btn btn-success"
                  @click="removeError()">Hide form error</button>
        </crip-col>
      </crip-row>
      <hr>
      <crip-row>
        <crip-col>
          <crip-form-card title="Form title"
                          :form="form"
                          @submit="save">

            <crip-card-action slot="actions"
                              :to="{name: 'form'}">Form components</crip-card-action>

            <crip-form-group :errors="form.errors.val1"
                             label="Val1:"
                             for="val1">
              <input type="text"
                     id="val1"
                     v-model="form.data.val1"
                     :class="[{'is-invalid': form.errors.val1}, 'form-control']">
            </crip-form-group>

            <crip-form-group>
              <input type="submit"
                     class="btn btn-primary">
            </crip-form-group>

          </crip-form-card>
        </crip-col>
      </crip-row>

      <code-sample>
        import Vue from "vue"
        import CripBootstrap, { Form } from "crip-vue-bootstrap"

        Vue.use(CripBootstrap)

        Vue.extend({
          template: `
            &lt;crip-form-card title="Form title"
                            :form="form"
                            @submit="save"&gt;

              &lt;crip-form-group :errors="form.errors.val1"
                               label="Val1:"
                               for="val1"&gt;
                &lt;input type="text"
                       id="val1"
                       v-model="form.data.val1"
                       :class="[{'is-invalid': form.errors.val1}, 'form-control']"&gt;
              &lt;/crip-form-group&gt;

              &lt;crip-form-group&gt;
                &lt;input type="submit"
                       class="btn btn-primary"&gt;
              &lt;/crip-form-group&gt;

            &lt;/crip-form-card&gt;
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

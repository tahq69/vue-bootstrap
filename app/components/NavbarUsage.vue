<script lang="ts">
import Vue from "vue"

import CripBootstrap, { Nav } from "@/main"
import CodeSample from "./CodeSample.vue"
import ExampleSection from "./ExampleSection.vue"

export default Vue.extend({
  name: "FormComponents",

  components: { ExampleSection, CodeSample },

  data() {
    return {
      left: [
        Nav.group("Root group element", [
          Nav.item({ text: "Blog", href: "http://hrefs.crip.lv/home", target: "_blank" }),
          Nav.divider(),
          Nav.group("Documentation", [
            Nav.item({ route: "form-components", text: "Form components" }),
            Nav.divider(),
            Nav.group("Documentation", [
              Nav.item({ route: "form-components", text: "Form components" }),
            ]),
          ]),
        ]),
      ],
    }
  },

  methods: {},
})
</script>

<template>
  <div>
    <example-section title="Form components">
      <c-row>
        <c-col>
          <p>
            Bootstrap navigation component.
          </p>
        </c-col>
      </c-row>
      <hr>
      <c-row>
        <c-col>
          <c-navbar :left="left"
                    :containered="false">
            <span class="navbar-brand">Banner</span>
          </c-navbar>
        </c-col>
      </c-row>

      <code-sample>
        import Vue from "vue"
        import CripBootstrap, { Nav } from "crip-vue-bootstrap"

        Vue.use(CripBootstrap)

        
      </code-sample>
    </example-section>
  </div>
</template>

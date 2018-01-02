<script lang="ts">
import Vue from "vue"

import CripBootstrap, { Nav } from "@/main"
import CodeSample from "./CodeSample.vue"
import ExampleSection from "./ExampleSection.vue"

export default Vue.extend({
  name: "FormComponents",

  components: { ExampleSection, CodeSample },

  data() {
    const authorUrl = "https://github.com/tahq69"
    const form = { route: "form-components", text: "Form components" }
    return {
      left: [
        Nav.group("Dropdown", [
          Nav.item({ text: "Header" }),
          Nav.divider(),
          Nav.group("Submenu", [
            Nav.item({ text: "Form components", route: "form-components" }),
            Nav.item({ text: "Blog", href: "http://hrefs.crip.lv/home", target: "_blank" }),
            Nav.item({ text: "Callback", click: () => alert("callback") }),
          ]),
        ]),
      ],

      right: [
        Nav.item({ text: "Blog", href: "http://hrefs.crip.lv/home", target: "_blank" }),
        Nav.item({ text: "Author", href: authorUrl, target: "_blank" }),
        Nav.item({ text: "Repository", href: `${authorUrl}/vue-bootstrap` }),
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
                    :right="right"
                    class="navbar-default navbar-static-top">
            <span class="navbar-brand">Banner</span>
          </c-navbar>
        </c-col>
      </c-row>

      <code-sample>
        import Vue from "vue"
        import CripBootstrap, { Nav } from "crip-vue-bootstrap"

        Vue.use(CripBootstrap)

        Vue.extend({
          template: `
            &lt;crip-navbar :left="left"
                         class="navbar-default navbar-static-top"&gt;
              &lt;span class="navbar-brand">Brand&lt;/span&gt;
            &lt;/crip-navbar&gt;
          `,

          data() {
            return {
              left: [
                Nav.group("Dropdown", [
                  Nav.item({ text: "Header" }),
                  Nav.divider(),
                  Nav.group("Submenu", [
                    Nav.item({ text: "Form components", route: "form-components" }),
                    Nav.item({ text: "Blog", href: "http://hrefs.crip.lv/home", target: "_blank" }),
                    Nav.item({ text: "Callback", click: () => alert("callback") }),
                  ]),
                ]),
              ]
            }
          }
        })
      </code-sample>
    </example-section>
  </div>
</template>

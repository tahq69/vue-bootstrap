<script lang="ts">
import Vue from "vue"

import Crip from "@/main"
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
        Crip.Nav.group("Dropdown", [
          Crip.Nav.item({ text: "Header" }),
          Crip.Nav.divider(),
          Crip.Nav.group("Submenu", [
            Crip.Nav.item({ text: "Form components", route: "form-components" }),
            Crip.Nav.item({ text: "Blog", href: "http://hrefs.crip.lv/home", target: "_blank" }),
            Crip.Nav.item({ text: "Callback", click: () => alert("callback") }),
          ]),
        ]),
      ],

      right: [
        Crip.Nav.item({ text: "Blog", href: "http://hrefs.crip.lv/home", target: "_blank" }),
        Crip.Nav.item({ text: "Author", href: authorUrl, target: "_blank" }),
        Crip.Nav.item({ text: "Repository", href: `${authorUrl}/vue-bootstrap` }),
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
        import Crip from "crip-vue-bootstrap"

        Vue.use(Crip)

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
                Crip.Nav.group("Dropdown", [
                  Crip.Nav.item({ text: "Header" }),
                  Crip.Nav.divider(),
                  Crip.Nav.group("Submenu", [
                    Crip.Nav.item({ text: "Form components", route: "form-components" }),
                    Crip.Nav.item({ text: "Blog", href: "http://hrefs.crip.lv/home", target: "_blank" }),
                    Crip.Nav.item({ text: "Callback", click: () => alert("callback") }),
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

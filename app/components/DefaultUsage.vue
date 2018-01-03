<script lang="ts">
import Vue from "vue"

import Crip from "@/main"
import CodeSample from "./CodeSample.vue"
import ExampleSection from "./ExampleSection.vue"

export default Vue.extend({
  name: "DefaultUsage",

  components: { ExampleSection, CodeSample },

  data() {
    return {
      visible: false,
    }
  },

  methods: {
    hide() {
      this.visible = false
    },
  },
})
</script>

<template>
  <example-section title="Default usage">
    <div class="row">
      <div class="col-xs-12">
        <p>
          TODO
        </p>

        <crip-alert>Alert sample</crip-alert>
      </div>
    </div>

    <code-sample>
      import Vue from "vue"
      import CripBootstrap from "crip-vue-bootstrap"

      Vue.use(CripBootstrap)
    </code-sample>
  </example-section>
</template>

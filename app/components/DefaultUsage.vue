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
    <h5 class="card-title">Alerts</h5>
    <p class="card-text">
      Some quick example text to build on the card title and make up the bulk of
      the card's content.
    </p>

    <p class="card-text">
      <crip-alert>Alert sample</crip-alert>
    </p>

    <code-sample>
      import Vue from "vue"
      import CripBootstrap from "crip-vue-bootstrap"

      Vue.use(CripBootstrap)
    </code-sample>
  </example-section>
</template>

<script lang="ts">
import Vue from "vue"

import CodeSample from "./CodeSample.vue"
import ExampleSection from "./ExampleSection.vue"

export default Vue.extend({
  name: "Configurations",

  components: { ExampleSection, CodeSample },

  methods: {},
})
</script>

<template>
  <example-section title="Configurations">
    <div class="row">
      <div class="col-xs-12">
        <p>
          TODO
        </p>
      </div>
    </div>

    <code-sample>
      import Vue from "vue"
      import CripBootstrap from "crip-vue-bootstrap"

      Vue.use(CripBootstrap)
    </code-sample>
  </example-section>
</template>

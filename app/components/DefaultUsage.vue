<script lang="ts">
import Vue from "vue"

import CripNotice from "@/main"
import CodeSample from "./CodeSample.vue"
import ExampleSection from "./ExampleSection.vue"

export default Vue.extend({
  name: "DefaultUsage",

  components: { ExampleSection, CodeSample },

  methods: {},
})
</script>

<template>
  <example-section title="Default usage">
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

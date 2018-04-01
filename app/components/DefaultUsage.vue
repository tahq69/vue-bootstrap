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
      isModalVisible: false,
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
  <div>
    <example-section title="Alert">
      <p class="card-text">
        Simple bootstrap alert component with option to close it.
      </p>

      <p class="card-text">
        <crip-alert>Alert sample</crip-alert>
      </p>

      <code-sample>
        import Vue from "vue"
        import CripBootstrap from "crip-vue-bootstrap"

        Vue.use(CripBootstrap)

        Vue.extend({
          template: `
            &lt;crip-alert&gt;
              Alert sample
            &lt;/crip-alert&gt;
          `,
        })
      </code-sample>
    </example-section>

    <example-section title="Modal">
      <p class="card-text">
        Simple bootstrap modal component with option to close it.
      </p>

      <p class="card-text">
        <button class="btn"
                @click="isModalVisible = true">Show modal</button>
        <crip-modal :is-visible.sync="isModalVisible"
                    size="lg">
          <span slot="title">Modal title</span>
          <span>Modal content goes here</span>
          <div slot="footer">
            <button type="button"
                    class="btn btn-secondary"
                    @click="isModalVisible = false">
              <span>Close</span>
            </button>
          </div>
        </crip-modal>
      </p>

      <code v-text="JSON.stringify(isModalVisible, null, 4)"></code>

      <code-sample>
        import Vue from "vue"
        import CripBootstrap from "crip-vue-bootstrap"

        Vue.use(CripBootstrap)

        Vue.extend({
          template: `
            &lt;crip-modal&gt;
              Modal content
            &lt;/crip-modal&gt;
          `,
        })
      </code-sample>
    </example-section>

  </div>
</template>

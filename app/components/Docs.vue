<script lang="ts">
import Vue from "vue"

import Configurations from "./Configurations.vue"
import DefaultUsage from "./DefaultUsage.vue"

export default Vue.extend({
  name: "CripDocs",

  components: { DefaultUsage, Configurations },
})
</script>

<template>
  <div class="container root">
    <div class="row">
      <div class="col col-md-8">
        <router-view />
      </div>
      <div class="col">
        <div class="card card-primary">
          <div class="card-header text-white bg-primary"
               id="default-usage">
            Documentation
          </div>

          <ul class="list-group list-group-flush">
            <li class="list-group-item">
              <router-link :to="{name: 'root'}">Default usage</router-link>
            </li>
            <li class="list-group-item">
              <router-link :to="{name: 'form'}">Form Components</router-link>
            </li>
            <li class="list-group-item">
              <router-link :to="{name: 'nav'}">Navbar</router-link>
            </li>
            <li class="list-group-item">
              <router-link :to="{name: 'table'}">Table Components</router-link>
            </li>
            <li class="list-group-item">
              <router-link :to="{name: 'configurations'}">Configurations</router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.root.container {
  margin-top: 101px;
}

.sidebar {
  padding: 0;

  .list-group {
    margin: 0;
  }
}
</style>

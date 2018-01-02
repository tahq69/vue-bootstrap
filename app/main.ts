import Vue from "vue"

import "./assets/styles.scss"

import CripBootstrap, { IBootstrapOptions } from "@/main"
import App from "./components/Docs.vue"

Vue.use<IBootstrapOptions>(CripBootstrap, { prefix: "C" })

import router from "./router"

const app = new Vue({
  render: h => h(App),
  router,
})

app.$mount(document.getElementById("app") || undefined)

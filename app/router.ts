import Vue from "vue"
import Router from "vue-router"

Vue.use(Router)

import Configurations from "./components/Configurations.vue"
import DefaultUsage from "./components/DefaultUsage.vue"
import FormComponents from "./components/FormComponents.vue"
import NavbarUsage from "./components/NavbarUsage.vue"

const router = new Router({
  routes: [
    { path: "/", name: "root", component: DefaultUsage },
    { path: "/configurations", name: "configurations", component: Configurations },
    { path: "/form-components", name: "form", component: FormComponents },
    { path: "/navbar", name: "nav", component: NavbarUsage },
    { path: "*", redirect: "/" },
  ],
})

export default router

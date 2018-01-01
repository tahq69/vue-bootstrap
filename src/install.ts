import Vue from "vue"

import { Install } from "$/plugin"
import Alert from "./components/Alert.vue"
import Gravatar from "./components/Gravatar.vue"

import Focus from "./directives/Focus"

import Panel from "./components/panel/Panel.vue"
import PanelAction from "./components/panel/PanelAction.vue"

let installed = false
let vueInstance: any

const install: Install = (vue: typeof Vue, options?: any) => {
  if (installed && vueInstance === vue) return

  installed = true
  vueInstance = vue

  vue.component("Alert", Alert)
  vue.component("Gravatar", Gravatar)
  vue.component("Panel", Panel)
  vue.component("PanelAction", PanelAction)

  vue.directive("Focus", Focus)
}

export default install

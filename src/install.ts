import Vue from "vue"

import { Install } from "$/plugin"
import Alert from "./components/Alert.vue"
import Gravatar from "./components/Gravatar.vue"

import Focus from "./directives/Focus"

import FormGroup from "./components/form/FormGroup.vue"
import FormPanel from "./components/form/FormPanel.vue"

import Col from "./components/grid/Col.vue"
import Row from "./components/grid/Row.vue"

import Panel from "./components/panel/Panel.vue"
import PanelAction from "./components/panel/PanelAction.vue"

let installed = false
let vueInstance: any

const install: Install = (vue: typeof Vue, options?: any) => {
  if (installed && vueInstance === vue) return

  installed = true
  vueInstance = vue

  const prefix = options && options.prefix ? options.prefix : "Crip"

  vue.component(`${prefix}Alert`, Alert)
  vue.component(`${prefix}Gravatar`, Gravatar)

  vue.component(`${prefix}FormGroup`, FormGroup)
  vue.component(`${prefix}FormPanel`, FormPanel)

  vue.component(`${prefix}Col`, Col)
  vue.component(`${prefix}Row`, Row)

  vue.component(`${prefix}Panel`, Panel)
  vue.component(`${prefix}PanelAction`, PanelAction)

  vue.directive(`${prefix}Focus`, Focus)
}

export default install

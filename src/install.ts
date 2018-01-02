import Vue from "vue"

import { Install } from "$/plugin"
import Alert from "./components/Alert.vue"
import Gravatar from "./components/Gravatar.vue"

import ClickOutside from "./directives/ClickOutside"
import Focus from "./directives/Focus"

import FormGroup from "./components/form/FormGroup.vue"
import FormPanel from "./components/form/FormPanel.vue"

import Col from "./components/grid/Col.vue"
import Row from "./components/grid/Row.vue"

import Navbar from "./components/nav/Navbar.vue"
import NavbarItems from "./components/nav/NavbarItems.vue"

import Panel from "./components/panel/Panel.vue"
import PanelAction from "./components/panel/PanelAction.vue"

import Grid from "./components/table/Grid.vue"
import GridHeader from "./components/table/GridHeader.vue"
import Pagination from "./components/table/Pagination.vue"
import PerPage from "./components/table/PerPage.vue"

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

  vue.component(`${prefix}Navbar`, Navbar)
  vue.component(`${prefix}NavbarItems`, NavbarItems)
  if (prefix !== "C") {
    // This component is used recursively, so we should ensure it is registered
    // with correct name.
    vue.component(`CNavbarItems`, NavbarItems)
  }

  vue.component(`${prefix}Panel`, Panel)
  vue.component(`${prefix}PanelAction`, PanelAction)

  vue.component(`${prefix}Grid`, Grid)
  vue.component(`${prefix}GridHeader`, GridHeader)
  vue.component(`${prefix}Pagination`, Pagination)
  vue.component(`${prefix}PerPage`, PerPage)

  vue.directive(`${prefix}Focus`, Focus)
  vue.directive(`${prefix}ClickOutside`, ClickOutside)
}

export default install

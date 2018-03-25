// tslint:disable:object-literal-sort-keys
import Vue from "vue"

import { IBootstrapOptions, LogLevel } from "$/index"
import { log, setVerbose } from "@/help"

import Alert from "./components/Alert.vue"
import Gravatar from "./components/Gravatar.vue"

import ClickOutside from "./directives/ClickOutside"
import Focus from "./directives/Focus"

import FormCard from "./components/form/FormCard.vue"
import FormErrors from "./components/form/FormErrors.vue"
import FormGroup from "./components/form/FormGroup.vue"

import Col from "./components/grid/Col.vue"
import Row from "./components/grid/Row.vue"

import Navbar from "./components/nav/Navbar.vue"
import NavbarItems from "./components/nav/NavbarItems.vue"

import Card from "./components/card/Card.vue"
import CardAction from "./components/card/CardAction.vue"

import Grid from "./components/table/Grid.vue"
import GridHeader from "./components/table/GridHeader.vue"
import Pagination from "./components/table/Pagination.vue"
import PerPage from "./components/table/PerPage.vue"

let installed = false
let vueInstance: any

const install = (vue: typeof Vue, options: IBootstrapOptions = {}) => {
  if (installed && vueInstance === vue) return

  installed = true
  vueInstance = vue

  const defaults: { prefix: string, logLevel: LogLevel, verbose: boolean } = {
    prefix: "Crip",
    logLevel: "error",
    verbose: true
  }

  const p = Object.assign(defaults, options)
  if (p.verbose) setVerbose(p.logLevel)

  log("debug", "install", { options: p })

  vue.component(`${p.prefix}Alert`, Alert)
  vue.component(`${p.prefix}Gravatar`, Gravatar)

  vue.component(`${p.prefix}FormCard`, FormCard)
  vue.component(`${p.prefix}FormGroup`, FormGroup)
  vue.component(`${p.prefix}FormErrors`, FormErrors)

  vue.component(`${p.prefix}Col`, Col)
  vue.component(`${p.prefix}Row`, Row)

  vue.component(`${p.prefix}Navbar`, Navbar)
  vue.component(`${p.prefix}NavbarItems`, NavbarItems)
  if (p.prefix !== "C") {
    // This component is used recursively, so we should ensure it is registered
    // with correct name for internal use.
    vue.component(`CNavbarItems`, NavbarItems)
  }

  vue.component(`${p.prefix}Card`, Card)
  vue.component(`${p.prefix}CardAction`, CardAction)

  vue.component(`${p.prefix}Grid`, Grid)
  vue.component(`${p.prefix}GridHeader`, GridHeader)
  vue.component(`${p.prefix}Pagination`, Pagination)
  vue.component(`${p.prefix}PerPage`, PerPage)

  vue.directive(`${p.prefix}Focus`, Focus)
  vue.directive(`${p.prefix}ClickOutside`, ClickOutside)
}

export default install

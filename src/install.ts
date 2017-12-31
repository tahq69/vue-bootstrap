import Vue from "vue"

import { Install } from "$/plugin"

let installed = false
let vueInstance: any

const install: Install = (vue: typeof Vue, options?: any) => {
  if (installed && vueInstance === vue) return

  installed = true
  vueInstance = vue

  console.log("Installing Crip Vue Bootstrap")
}

export default install

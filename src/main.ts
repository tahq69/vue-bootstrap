// tslint:disable:variable-name

import install from "./install"

import { Form } from "./components/form/Form"
import { Nav, NavItem, NavItemGroup } from "./components/nav"
import { createPaging, Paging } from "./components/table"
import { Utils } from "./Utils"

export { IBootstrapOptions } from "$/index"

export default {
  install,
  version: "__VERSION__",

  createPaging,

  Form,
  Nav,
  NavItem,
  NavItemGroup,
  Paging,
  Utils,
}

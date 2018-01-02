// tslint:disable:variable-name

import install from "./install"

import { Form } from "./components/form/Form"
import { Nav } from "./components/nav/Nav"
import { NavItem } from "./components/nav/NavItem"
import { NavItemGroup } from "./components/nav/NavItemGroup"
import { Paging } from "./components/table/Paging"
import { Utils } from "./Utils"

export { ICripBootstrapOptions } from "$/index"

export default {
  install,
  version: "__VERSION__",

  Form,
  Nav,
  NavItem,
  NavItemGroup,
  Paging,
  Utils,
}

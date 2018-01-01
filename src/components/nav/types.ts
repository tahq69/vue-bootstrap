import { RawLocation } from "vue-router"

import NavItem from "./NavItem"
import NavItemGroup from "./NavItemGroup"

export interface INavItemOptions {
  route?: RawLocation
  href?: string
  click?: () => void
  divider?: boolean
  text?: string
  isActive?: boolean
  target?: "_blank" | "_self" | "_parent" | "_top" | string
}

import { RawLocation } from "vue-router"

export declare class Nav {
  static divider(): NavItem
  static group(text: string, items?: Array<NavElement>): NavItemGroup
  static item(options?: INavItemOptions): NavItem
}

export declare class NavItem {
  divider: boolean
  href?: string
  isActive: boolean
  key: number
  route?: RawLocation
  target: string
  text: string

  click?: () => void

  constructor(options?: INavItemOptions)
}

export declare class NavItemGroup {
  key: number
  items: Array<NavElement>
  parent: { text: string }

  constructor(text: string, items?: Array<NavElement>)

  add(item: NavElement): void
  create(options: INavItemOptions): void
}

export type NavElement = NavItem | NavItemGroup

export interface INavItemOptions {
  route?: RawLocation
  href?: string
  divider?: boolean
  text?: string
  isActive?: boolean
  target?: "_blank" | "_self" | "_parent" | "_top" | string

  click?: () => void
}

import { INavItemOptions } from "./types"

import NavItem from "./NavItem"
import NavItemGroup from "./NavItemGroup"

export default class Nav {
  public static item(options?: INavItemOptions): NavItem {
    return new NavItem(options)
  }

  public static group(text: string, items: Array<NavItem | NavItemGroup>): NavItemGroup {
    return new NavItemGroup(text, items)
  }

  public static divider() {
    return new NavItem({ divider: true })
  }
}

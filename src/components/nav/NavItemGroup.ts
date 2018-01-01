import NavItem from "./NavItem"
import { INavItemOptions } from "./types"

let key = 100000

export default class NavItemGroup {
  public key: number
  public items: Array<NavItemGroup | NavItem>
  public parent: { text: string }

  constructor(text: string, items: Array<NavItemGroup | NavItem> = []) {
    this.key = ++key
    this.parent = { text }
    this.items = items
  }

  public add(item: NavItemGroup | NavItem) {
    this.items.push(item)
  }

  public create(options: INavItemOptions) {
    this.items.push(new NavItem(options))
  }
}

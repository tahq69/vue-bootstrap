import { RawLocation } from "vue-router"

import { INavItemOptions } from "./types"

let key = 200000

export default class NavItem {
  public key: number
  public isActive: boolean
  public divider: boolean
  public text: string
  public target: string

  public route?: RawLocation
  public href?: string
  public click?: () => void

  constructor(options: INavItemOptions = {}) {
    this.key = ++key
    this.route = options.route
    this.href = options.href
    this.click = options.click
    this.divider = options.divider || false
    this.text = options.text || ""
    this.isActive = options.isActive || false
    this.target = options.target || "_self"
  }
}

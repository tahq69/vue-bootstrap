import { Utils } from "@/Utils"

export class Page {
  public key: string
  public nr: number
  public text: string
  public active: boolean
  public disabled: boolean
  public route: any

  private curr: number

  public constructor(curr: number, text: string, nr: number, route: any) {
    this.curr = curr
    this.key = `${nr}-${text}`

    this.text = text
    this.nr = nr
    this.route = this.cloneRoute(route)

    this.disabled = this.isCurr && Utils.isEmpty(parseInt(this.text, 10))
    this.active = this.isCurr && !this.disabled
  }

  private get isCurr() {
    return this.nr === this.curr
  }

  private cloneRoute(original: any) {
    const route = JSON.parse(JSON.stringify(original))

    if (!route.params) {
      route.params = { page: this.nr.toString() }
    } else {
      route.params.page = this.nr.toString()
    }

    return route
  }
}

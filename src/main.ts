// tslint:disable:variable-name
import { Install } from "$/plugin"

import form from "./components/form/Form"
import nav from "./components/nav/Nav"
import paging from "./components/table/Paging"
import install from "./install"
import utils from "./Utils"

export const Form = form
export const Nav = nav
export const Utils = utils
export const Paging = paging

export default class CripVueBootstrap {
  public static install: Install
  public static version: string
}

CripVueBootstrap.install = install
CripVueBootstrap.version = "__VERSION__"

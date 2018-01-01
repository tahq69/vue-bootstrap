// tslint:disable:variable-name
import { Install } from "$/plugin"

import form from "./components/form/Form"
import nav from "./components/nav/Nav"
import install from "./install"

export const Form = form
export const Nav = nav

export default class CripVueBootstrap {
  public static install: Install
  public static version: string
}

CripVueBootstrap.install = install
CripVueBootstrap.version = "__VERSION__"

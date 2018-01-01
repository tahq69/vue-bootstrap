import { Install } from "$/plugin"

import form from "./components/form/Form"
import install from "./install"

// tslint:disable-next-line:variable-name
export const Form = form

export default class CripVueBootstrap {
  public static install: Install
  public static version: string
}

CripVueBootstrap.install = install
CripVueBootstrap.version = "__VERSION__"

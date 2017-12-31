import { Install } from "$/plugin"

import install from "./install"

export default class CripVueBootstrap {
  public static install: Install
  public static version: string
}

CripVueBootstrap.install = install
CripVueBootstrap.version = "__VERSION__"

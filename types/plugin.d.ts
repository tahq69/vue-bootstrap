import Vue from "vue"

export type Install = (vue: typeof Vue, options?: any) => void

export declare class Plugin {
  static install: Install
  static version: string
}

import Vue from "vue"

export * from "./nav"
export * from "./table"

export interface IDictionary<T> {
  [key: string]: T
}

export interface IBootstrapOptions {
  prefix?: string
}

export declare function Install(vue: typeof Vue, options?: IBootstrapOptions): void

declare const _default: {
  install: typeof Install
  version: string
}

export default _default

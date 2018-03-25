import Vue from "vue"

export * from "./form"
export * from "./nav"
export * from "./table"

export type LogLevel = "debug" | "log" | "warn" | "error"

export interface IDictionary<T> {
  [key: string]: T
}

export interface IBootstrapOptions {
  prefix?: string
  logLevel?: LogLevel
  verbose?: boolean
}

export declare function Install(vue: typeof Vue, options?: IBootstrapOptions): void

declare const _default: {
  install: typeof Install
  version: string
}

export default _default

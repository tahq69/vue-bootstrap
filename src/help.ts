import { LogLevel } from "../types"

const logLevels = ["debug", "log", "warn", "error"]
const pluginName = "[crip-vue-bootstrap]"

let verbose = false
let logLevel = "debug"

export function setVerbose(debugLevel = "debug") {
  if (logLevels.indexOf(debugLevel) < 0) {
    // tslint:disable-next-line:no-console
    console.warn(pluginName, "Invalid debug level provided.")
    return
  }

  verbose = true
  logLevel = debugLevel
}

export function log(type: LogLevel, ...args: any[]) {
  if (verbose && logLevels.indexOf(type) >= logLevels.indexOf(logLevel) && console[type]) {
    console[type].apply(console, [pluginName, ...args])
  }
}

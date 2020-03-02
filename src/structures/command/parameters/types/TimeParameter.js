const Parameter = require('./Parameter.js')
const CommandError = require('../../CommandError.js')
const ms = require("ms")

module.exports = class TimeParameter extends Parameter {

  static parse (arg, { t }) {
    if(!arg) return

    const time = ms(arg)
    if(!time) throw new CommandError(t("errors:invalidTime"))
    return time
  }
}

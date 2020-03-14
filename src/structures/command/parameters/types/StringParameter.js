const Parameter = require('./Parameter.js')
const { Discord } = require('discord.js')
const CommandError = require('../../CommandError.js')

module.exports = class StringParameter extends Parameter {
  static parseOptions (options = {}) {
    return {
      ...super.parseOptions(options),
      maxLength: Number(options.maxLength) || 0,
      truncate: !!options.truncate
    }
  }

  static parse (arg, { t, message }) {
    arg = arg ? (typeof arg === 'string' ? arg : String(arg)) : undefined
    if (!arg) return


    if (this.maxLength > 0 && arg.length > this.maxLength) {
      if (!this.truncate) throw new CommandError(t('errors:needSmallerString', { number: this.maxLength }))
      arg = arg.substring(0, this.maxLength)
    }

    return arg.toString()
  }
}

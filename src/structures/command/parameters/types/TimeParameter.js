const Parameter = require('./Parameter.js')
const CommandError = require('../../CommandError.js')
const ms = require("ms")

module.exports = class TimeParameter extends Parameter {
  static parseOptions (options = {}) {
    return {
      ...super.parseOptions(options),
      acceptDate: !!options.acceptDate
    }
  }

  static parse (arg, { t }) {
    if(!arg) return

   	console.log(arg)

    let time = ms(arg)

	if (this.acceptDate && !time) {
		const date = new Date(arg)

		time = date.getTime()
	}

	console.log(time)

    if(!time) throw new CommandError(t("errors:invalidTime"))
    return time
  }
}

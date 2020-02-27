/* eslint-disable no-eval */

const { Command } = require('../../')
const util = require('util')

module.exports = class Eval extends Command {
  constructor (client) {
    super({
      name: 'eval',
      aliases: ['execute'],
      category: 'developers',
      hidden: true,
      requirements: { devOnly: true },
      parameters: [{
        type: 'string', full: true, missingError: 'errors:missingParameters', showUsage: false
      }]
    }, client)
  }

  async run ({ channel, message, guild, author, t }, expr) {
    try {
      const evaled = await eval(expr.replace(/(^`{3}(\w+)?|`{3}$)/g, ''))
      let cleanEvaled = this.clean(util.inspect(evaled, { depth: 0 })).replace(this.client.token, "Quase em otário")
      
      await channel.send(cleanEvaled, { code: 'xl' })
    } catch (err) {
      channel.send('`ERROR` ```xl\n' + this.clean(err) + '\n```')
    }
  }

  clean (text) {
    const blankSpace = String.fromCharCode(8203)
    return typeof text === 'string' ? text.replace(/`/g, '`' + blankSpace).replace(/@/g, '@' + blankSpace) : text
  }
}

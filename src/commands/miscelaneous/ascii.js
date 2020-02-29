const { Command, MayfiEmbed, CommandError } = require('../../')
const figlet = require('figlet')

module.exports = class Ascii extends Command {
  constructor (client) {
    super({
      name: 'ascii',
      aliases: ['asciify'],
      category: 'miscelaneous',
      parameters: [{
        type: 'string', full: true, maxLength: 30, missingError: 'errors:missingParameters', 
      }]
    }, client)
  }

  async run ({ channel, t, author }, text) {
    try {
      const result = await figlet(text)

      channel.send(`\`\`\`${result}\`\`\``)
    } catch (err) {
      throw new CommandError(`${t("errors:generic")}\n \`${err}\``)
    }
  }
}

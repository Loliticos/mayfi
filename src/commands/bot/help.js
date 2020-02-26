const { Command, CommandError, MayfiEmbed } = require('../../')

const regexpSpecialChars = /([[\]^$|()\\+*?{}=!.])/gi
const quoteRegex = (text) => text.replace(regexpSpecialChars, '\\$1')
const prefixRegex = (prefix) => new RegExp(`^${quoteRegex(prefix)}`)

module.exports = class Help extends Command {
  constructor (client) {
    super(client, {
      name: 'help',
      aliases: ['commands', 'ajuda', 'halp'],
      category: 'bot',
      parameters: [{
        type: 'string', full: true, required: false
      }]
    }, client)
  }

  async run ({ t, author, channel, guild, prefix }, cmd) {
    const embed = new MayfiEmbed(author)
    const validCommands = this.client.commands.filter(c => !c.hidden)

    if (cmd) {
      const command = this.client.commands.get(cmd.toString())

      if (!command) {
        throw new CommandError(t("commands:help.commandNotFound"))
      }

      let commandUsage = `\`${t(`commands:${command.name}.commandUsage`)}\``
      
      if(!commandUsage) {
        commandUsage = `\`${prefix}${this.name}\``
      }

      embed
        .setTitle(command.name)
        .setDescription(`
          ${t([`commands:${command.name}.commandDescription`, "commands:help.noDescriptionProvided"])}

          **${t("commons:usage")}:** \`${t([`commands:${command.name}.commandUsage`, "commands:help.noUsage"])}\`

          `)
        channel.send(embed)
    }
  }
}

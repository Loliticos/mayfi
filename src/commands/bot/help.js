const { Command, CommandError, MayfiEmbed } = require('../../')

module.exports = class Help extends Command {
  constructor (client) {
    super({
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
      const command = this.client.commands.get(cmd)

      if (!command) {
        throw new CommandError(t("commands:help.commandNotFound"))
      }

      const description = [
        t([`commands:${command.name}.commandDescription`, "commands:help.noDescriptionProvided"]),
        '',
        command.usage(t, prefix)
      ]

      if (command.aliases && command.aliases.length > 0) description.push(`\n**Aliases:** ${command.aliases.map(a => `\`${a}\``).join(', ')}`)
      if (command.requirements && command.requirements.permissions && command.requirements.permissions.length > 0) description.push(`\n**${t('commands:help.permissions')}:** ${command.requirements.permissions.map(p => `\`${t(`permissions:${p}`)}\``).join(', ')}`)
      if (command.subcommands.length > 0) description.push(`\n**${t('commands:help.subcommands')}:** ${command.subcommands.map(a => `\`${a.name}\``).join(', ')}`)
      if (command.requirements && command.requirements.botPermissions && command.requirements.botPermissions.length > 0) description.push(`\n**${t('commands:help.botPermissions')}:** ${command.requirements.botPermissions.map(p => `\`${t(`permissions:${p}`)}\``).join(', ')}`)
     
      embed
        .setTitle(cmd)
        .setDescription(description.join('\n'))
        .setFooter(t("commands:help.footer"))
        channel.send(embed)
    } else {
      embed
        .setTitle(t("commands:help.title"))
        .setDescription(`${t("commands:help.prefix", { botPrefix: prefix })}, ${t("commands:help.youCanUse", { botMention: this.client.user })}`)
        .setFooter(t('commands:help.specificInformation', { helpString: `${prefix}${this.name} ${t('commands:help.commandUsage')}` }))
        const categories = validCommands.map(c => c.category).filter((v, i, a) => a.indexOf(v) === i)
        categories
          .sort((a, b) => t(`categories:${a}`).localeCompare(t(`categories:${b}`)))
          .forEach(category => {
            const commands = validCommands
              .filter(c => c.category === category)
              .sort((a, b) => a.name.localeCompare(b.name))
              .map(c => `\`${c.name}\``).join('**, **')

            const length = validCommands.filter(c => c.category === category).size

            embed.addField(`${t(`categories:${category}`)} [**${length}**]`, commands, false)
          })
        channel.send(embed)
    }
  }
}

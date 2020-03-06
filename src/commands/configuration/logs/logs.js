const { Command, MayfiEmbed } = require('../../../')

module.exports = class Logs extends Command {
  constructor (client) {
    super({
      name: 'logs',
      aliases: ['setlogs'],
      category: 'social',
      requirements: { databaseOnly: true }
    }, client)
  }

  async run ({ channel, guild, author, t, prefix }) {
    const embed = new MayfiEmbed(author)
      .setDescription(this.subcommands.map(subcmd => {
        return `\`${prefix}${this.name} ${subcmd.name}\` - ${t(`commands:${subcmd.path}.commandDescription`)}`
    }).join('\n'))
    channel.send({embed})

  }
}
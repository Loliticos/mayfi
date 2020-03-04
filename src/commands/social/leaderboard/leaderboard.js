const { Command, MayfiEmbed } = require('../../../')

module.exports = class Leaderboard extends Command {
  constructor (client) {
    super({
      name: 'leaderboard',
      aliases: ['top'],
      category: 'social',
      requirements: { databaseOnly: true }
    }, client)
  }

  async run ({ channel, guild, author, t, prefix }) {
    const embed = new MayfiEmbed(author)
      .setDescription(this.subcommands.map(subcmd => {
        return `\`${prefix}${subcmd.name}\` - ${t(`commands:${subcmd.path}.commandDescription`)}`
    }).join('\n'))
    channel.send(embed)

  }
}

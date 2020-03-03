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
      .setDescription(t("commands:leaderboard.allSubcommands", { prefix }))
    channel.send(embed)

  }
}

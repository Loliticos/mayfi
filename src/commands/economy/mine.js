const { Command, MayfiEmbed, CommandError, Constants } = require('../../')
const moment = require("moment")

module.exports = class Mine extends Command {
  constructor (client) {
    super({
      name: 'mine',
      aliases: ['minerar', 'mina', 'daily'],
      category: 'economy',
      requirements: { databaseOnly: true }
    }, client)
  }

  async run ({ channel, guild, author, t, prefix }) {
    const embed = new MayfiEmbed(author)

    let { lastMine, gems } = await this.client.database.users.findOne({_id: author.id})

    if (Date.now() - lastMine < 43200000) {
      embed
        .setTitle(t("commands:mine.alreadyMined"))
        .setDescription(t("commands:mine.youCanMineAgain", { cooldown: moment.duration(43200000 - (Date.now() - lastMine)).format('h[h] m[m] s[s]') }))
      return channel.send(embed)
    }

    try {
      const foundGems = Math.floor(1 + Math.random() * (437 - 1))

      await this.client.database.users.updateOne({_id: author.id}, { lastMine: Date.now(), gems: gems += foundGems })

      channel.send(embed.setDescription(t('commands:mine.mined', { gems: foundGems, prefix })))
    } catch(err) {
      throw new CommandError(t("errors:generic"))
    }
  }
}

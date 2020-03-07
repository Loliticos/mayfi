const { Command, MayfiEmbed, CommandError, Constants } = require('../../')
const moment = require("moment")

module.exports = class Mine extends Command {
  constructor (client) {
    super({
      name: 'mine',
      aliases: ['minerar', 'mina', 'daily'],
      category: 'economy',
      cooldown: 5,
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
      const foundFragments = Math.floor(1 + Math.random() * (72 - 1))

      await this.client.database.users.updateOne({_id: author.id}, { $inc: { gems: foundGems, fragments: foundFragments }, lastMine: Date.now() })

      channel.send(embed.setDescription(t('commands:mine.mined', { gems: foundGems, prefix, foundFragments })))
    } catch(err) {
      throw new CommandError(t("errors:generic"))
    }
  }
}

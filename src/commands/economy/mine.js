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

  async run ({ channel, guild, author, t }) {
    const embed = new MayfiEmbed(author)

    let { lastMine, money } = await this.client.database.users.findOne({_id: author.id})

    if (Date.now() - lastMine < 86400000) {
      embed
        .setTitle(t("commands:mine.alreadyMined"))
        .setDescription(t("commands:mine.youCanMineAgain", { cooldown: moment.duration(86400000 - (Date.now() - lastMine)).format('h[h] m[m] s[s]') }))
      return channel.send(embed)
    }

    try {
      const dayRDM = Math.floor(437 + Math.random() * (783 - 437))

      await this.client.database.users.updateOne({_id: author.id}, { lastMine: Date.now(), money: money += dayRDM })


      channel.send(embed.setDescription(t('commands:mine.mined', { mined: dayRDM })))
    } catch(err) {
      throw new CommandError(t("errors:generic"))
    }
  }
}

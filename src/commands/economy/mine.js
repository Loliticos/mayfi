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

    try {
      const { gems, fragments: foundFragments } = await this.client.controllers.economy.bonus.claimDaily(author.id)

      embed
        .setDescription(t('commands:mine.mined', { gems, prefix, foundFragments }))

    } catch (e) {
      embed
        .setColor(Constants.ERROR_COLOR)
      switch (e.message) {
        case "ALREADY_CLAIMED": 
          embed
            .setTitle(t("commands:mine.alreadyMined"))
            .setDescription(t("commands:mine.youCanMineAgain", { cooldown: e.formattedCooldown }))
          break
        default:
          embed
            .setTitle(t("errors:generic"))
          console.error(e)
      }
    }

    channel.send(embed)
  }
}

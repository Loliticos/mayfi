const { Command, MayfiEmbed, Constants } = require('../../')
const coins = {
  heads: "https://cdn.discordapp.com/attachments/677214949159862272/685512381987684392/fMemdeFmPeYAAAAAASUVORK5CYII.png",
  tails: "https://cdn.discordapp.com/attachments/677214949159862272/685512212387069982/Y5vgPrzC7Iazmd78B6LVfyzD7HfwBKvIh3eeptpAAAAABJRU5ErkJggg.png"
}

module.exports = class Betflip extends Command {
  constructor (client) {
    super({
      name: 'betflip',
      aliases: ['apostar'],
      category: 'games',
      parameters: [{
        type: 'number', min: 50, max: 2500, missingError: 'commands:betflip.noAmount'
      }, {
        type: 'string', full: true, whitelist: ['heads', 'tails'], missingError: 'commands:betflip.noSide'
      }]
    }, client)
  }

  async run ({ channel, author, t}, amount, side) {
    const embed = new MayfiEmbed(author)

    try {
      const { choosenSide, won } = await this.client.controllers.economy.betflip(author, amount, side)

      embed
        .setDescription(t(`commands:betflip.${side === won ? "won" : "loss"}`, { choosenSide, amount }))
        .setThumbnail(coins[choosenSide])

    } catch (e) {
      switch (e.message) {
        case "NOT_ENOUGH_MONEY":
          embed
            .setColor(Constants.ERROR_COLOR)
            .setTitle(t("errors:notEnoughMoney"))
          break
        default:
          console.error(e)
          embed
            .setColor(Constants.ERROR_COLOR)
            .setTitle(t("errors:generic"))
      }
    }

    channel.send({embed})
    
  }
}

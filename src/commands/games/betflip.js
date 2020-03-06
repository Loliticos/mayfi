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
        type: 'number', min: 1, missingError: 'commands:betflip.noAmount'
      }, {
        type: 'string', full: true, whitelist: ['heads', 'tails', 'cara', 'coroa'], missingError: 'commands:betflip.noSide'
      }]
    }, client)
  }

  async run ({ channel, author, t}, amount, side) {
    const embed = new MayfiEmbed(author)

    const user = await this.client.database.users.findOne({_id: author.id})

    if(user.money < amount) {
      embed
        .setTitle(Constants.ERROR_COLOR)
        .setTitle(t("errors:notEnoughMoney"))
      return channel.send(embed)
    }

    const choosenSide = Math.random() > 0.5 ? 'heads' : 'tails'

    const bet = side.toLowerCase() === choosenSide ? amount : -amount

    await this.client.database._users.update({_id: author.id}, { $inc: { money: bet } })

    let embed = new MayfiEmbed(author)
      .setDescription(t(`commands:betFlip.${side === choosenSide ? "won" : "loss"}`, { choosenSide, amount }))
      .setThumbnail(coins[choosenSide])
    channel.send({embed})
    
  }
}

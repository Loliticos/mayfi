const { Command, MayfiEmbed } = require('../../')
const coins = {
  heads: "https://cdn.discordapp.com/attachments/677214949159862272/685512381987684392/fMemdeFmPeYAAAAAASUVORK5CYII.png",
  tails: "https://cdn.discordapp.com/attachments/677214949159862272/685512212387069982/Y5vgPrzC7Iazmd78B6LVfyzD7HfwBKvIh3eeptpAAAAABJRU5ErkJggg.png"
}

module.exports = class Coinflip extends Command {
  constructor (client) {
    super({
      name: 'coinflip',
      category: 'games',
    }, client)
  }

  run ({ channel, author, t}) {
    const sides = ['heads', 'tails']
    const result = sides[Math.floor(Math.random() * sides.length)]
    let embed = new MayfiEmbed(author)
      .setDescription(t("commands:coinflip.landed", { side: result }))
      .setThumbnail(coins[result])
    channel.send({embed})
    
  }
}

const { Command, MayfiEmbed } = require('../../')
const coins = {
  heads: "https://sorteador.com.br/_imgs/caracoroa/cara.jpg",
  tails: "https://cdn.discordapp.com/attachments/679117210215776276/682598126191771683/Y5vgPrzC7Iazmd78B6LVfyzD7HfwBKvIh3eeptpAAAAABJRU5ErkJggg.png"
}

module.exports = class Coinflip extends Command {
  constructor (client) {
    super({
      name: 'coinflip',
      category: 'fun',
    }, client)
  }

  async run ({ channel, author, t}) {
    const sides = ['heads', 'tails']
    const result = sides[Math.floor(Math.random() * sides.length)]
    let embed = new MayfiEmbed(author)
      .setDescription(t("commands:coinflip.landed", { side: result }))
      .setThumbnail(coins[result])
    channel.send(embed)
    
  }
}

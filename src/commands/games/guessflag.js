const { Command, MayfiEmbed, Constants } = require('../../')
const fetch = require("node-fetch")
const { Attachment } = require("discord.js")

module.exports = class Guessflag extends Command {
  constructor (client) {
    super({
      name: 'guessflag',
      aliases: ["guessflags", 'guesstheflag'],
      category: 'games'
    }, client)
  }

  async run ({ channel, author, t}) {
    let embed = new MayfiEmbed(author)
    const choosenCountry = await fetch("https://api.printful.com/countries").then(res => res.json())

    const country = choosenCountry.result[Math.floor(Math.random() * choosenCountry.result.length)]
    embed
      .setTitle(t("commands:guessflag.guessTheFlag"))
      .setDescription(t("commands:guessflag.country"))
      .setThumbnail(`https://www.countryflags.io/${country.code.toLowerCase()}/flat/64.png`)
    channel.send(embed)

    const filter = c => c.author.equals(author) && c.content.toLowerCase() == country.name.toLowerCase() || c.content.toLowerCase() == country.code.toLowerCase()

    channel.awaitMessages(filter, { time: 10000, max: 1 })
      .then(collected => {
        embed = new MayfiEmbed(author)
        if (collected.size > 0) {
          embed
            .setTitle(t("commands:guessflag.youGotIt"))
            .setDescription(t("commands:guessflag.theWordWas", { country }))
          return channel.send({ embed })
        } else {
          embed
            .setColor(Constants.ERROR_COLOR)
            .setTitle(t("commands:guessflag.timeout"))
          return channel.send({ embed })
        }
      })
    
  }
}

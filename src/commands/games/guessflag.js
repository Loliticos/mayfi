const { Command, MayfiEmbed, Constants } = require('../../')
const fetch = require("node-fetch")
const emojiList = ['🔄']

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

    function play() {
      const country = choosenCountry.result[Math.floor(Math.random() * choosenCountry.result.length)]

      console.log(country)

      embed
        .setTitle(t("commands:guessflag.guessTheFlag"))
        .setDescription(`${t("commands:guessflag.country")}\n${t("commands:guessflag.hint")}: ${country.name.substr(0, 2)}`)
        .setThumbnail(`https://www.countryflags.io/${country.code.toLowerCase()}/flat/64.png`)
      channel.send({embed})

      const filter = c => c.content.toLowerCase() == country.name.toLowerCase()

      channel.awaitMessages(filter, { time: 10000, max: 1 })
        .then(collected => {
          embed = new MayfiEmbed(author)
          if (collected.size > 0) {
            embed
              .setTitle(t("commands:guessflag.youGotIt"))
              .setDescription(t("commands:guessflag.theWordWas", { country }))

            return channel.send({ embed }).then(async (msg) => {
              for (const emoji of emojiList) await msg.react(emoji)

              const reactionCollector = await msg.createReactionCollector(
                (reaction, user) => emojiList.includes(reaction.emoji.name) && !user.bot,
                { time: 10000 })

              reactionCollector.on('collect', (reaction) => {

                switch (reaction.emoji.name) {
                  case emojiList[0]:
                    play()
                    msg.delete()
                    break;
                }
              })

              reactionCollector.on('end', (result) => {
                if(!result.size) {
                  msg.clearReactions()
                }

              })
            })
          } else {
            embed
              .setColor(Constants.ERROR_COLOR)
              .setTitle(t("commands:guessflag.timeout"))
            return channel.send({ embed })
          }
        })
    }

    play()
    
  }
}

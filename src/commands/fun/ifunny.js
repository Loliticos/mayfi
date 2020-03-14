const { Command, MayfiEmbed, MiscUtils } = require('../../')
const ifunny = require("ifunny-web-api")

module.exports = class Ifunny extends Command {
  constructor (client) {
    super({
      name: 'ifunny',
      aliases: ['if'],
      category: 'fun',
    }, client)
  }

  async run ({ channel, author, t}) {
    const embed = new MayfiEmbed(author)

    channel.startTyping()

    ifunny({ shuffle: false }, (err, res) => {
      if (err) console.error(err)

      const data = res[Math.floor(Math.random() * res.length)]

      console.log(data)

      embed
        .setTitle(data.tags)
        .setDescription(t("commands:ifunny.imageNotLoading", { link: data.url }))
        .setImage(data.src)
      channel.send(embed).then(() => channel.stopTyping())
    })  
  }
}

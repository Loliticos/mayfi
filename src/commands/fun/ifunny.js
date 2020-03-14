const { Command, MayfiEmbed, CommandError } = require('../../')
const ifunny = require("ifunny-web-api")

module.exports = class Ifunny extends Command {
  constructor (client) {
    super({
      name: 'ifunny',
      aliases: ['if'],
      category: 'fun'
    }, client)
  }

  async run ({ channel, author, t}) {
    const embed = new MayfiEmbed(author)

    channel.startTyping()

    try {
      ifunny({ shuffle: false }, (err, res) => {
        if (err) console.error(err)

        const data = res[Math.floor(Math.random() * res.length)]

        embed
          .setTitle(data.tags)
          .setDescription(t("commands:ifunny.imageNotLoading", { link: data.url }))
          .setImage(data.src)
        channel.send(embed).then(() => channel.stopTyping())
      })  
    } catch (e) {
      throw new CommandError(t("errors:generic")).then(() => channel.stopTyping())
    }
  }
}

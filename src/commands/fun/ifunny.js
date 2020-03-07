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

    ifunny({ shuffle: false }, (err, res) => {
      if (err) console.error(err)

      const data = res[Math.floor(Math.random() * res.length)]

      embed
        .setTitle(data.tags)
        .setImage(data.src)
      channel.send(embed)
    })  
  }
}

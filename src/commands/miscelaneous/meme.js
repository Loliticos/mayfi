const { Command, MayfiEmbed } = require('../../')
const fetch = require("node-fetch")

module.exports = class Meme extends Command {
  constructor (client) {
    super({
      name: 'meme',
      aliases: ['memes', 'random-meme'],
      category: 'miscelaneous'
    }, client)
  }

  async run ({ author, channel }) {
    const embed = new MayfiEmbed(author)

    const body = await fetch("https://api.imgflip.com/get_memes").then(res => res.json())
    const random = (Math.floor(Math.random() * Math.floor(100)))

    channel.send(
      embed
        .setImage(body.data.memes[random].url)
    )

  }
}

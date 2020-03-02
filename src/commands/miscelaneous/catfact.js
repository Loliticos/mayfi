const { Command, MayfiEmbed } = require('../../')
const fetch = require("node-fetch")

module.exports = class Catfact extends Command {
  constructor (client) {
    super({
      name: 'catfact',
      aliases: ['catfacts'],
      category: 'miscelaneous'
    }, client)
  }

  async run ({ author, channel }) {
    const embed = new MayfiEmbed(author)

    const body = await fetch("https://catfact.ninja/fact").then(res => res.json())

    channel.send(embed.setTitle(body.fact))
  }
}

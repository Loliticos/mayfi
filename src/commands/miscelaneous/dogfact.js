const { Command, MayfiEmbed } = require('../../')
const fetch = require("node-fetch")

module.exports = class Dogfact extends Command {
  constructor (client) {
    super({
      name: 'dogfact',
      aliases: ['dogfacts'],
      category: 'miscelaneous'
    }, client)
  }

  async run ({ author, channel }) {
    const embed = new MayfiEmbed(author)

    const body = await fetch("https://dog-api.kinduff.com/api/facts").then(res => res.json())

    channel.send(embed.setTitle(body.facts[0]))
  }
}

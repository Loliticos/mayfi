const { Command, MayfiEmbed } = require('../../')
const fetch = require("node-fetch")

module.exports = class Advice extends Command {
  constructor (client) {
    super({
      name: 'advice',
      aliases: ['dica', 'tip'],
      category: 'miscelaneous'
    }, client)
  }

  async run ({ author, channel }) {
    const embed = new MayfiEmbed(author)

    const body = await fetch("https://api.adviceslip.com/advice").then(res => res.json())
    channel.send(
      embed
        .setTitle(body.slip.advice)
      )

  }
}

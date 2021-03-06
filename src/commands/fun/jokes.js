const { Command, MayfiEmbed } = require('../../')
const fetch = require("node-fetch")

module.exports = class Jokes extends Command {
  constructor (client) {
    super({
      name: 'jokes',
      aliases: ['joke'],
      category: 'fun'
    }, client)
  }

  async run ({ author, channel }) {
    const embed = new MayfiEmbed(author)

    const body = await fetch("http://api.icndb.com/jokes/random").then(res => res.json())
    channel.send(
      embed
        .setDescription(body.value.joke)
      )

  }
}

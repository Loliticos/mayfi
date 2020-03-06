const { Command, MayfiEmbed } = require('../../')
const fetch = require("node-fetch")

module.exports = class Instagram extends Command {
  constructor (client) {
    super({
      name: 'instagram',
      category: 'utility',
      parameters: [{
        type: 'string',
        full: true,
        missingError: 'commands:instagram.invalidUser'
      }]
    }, client)
  }

  async run ({ t, channel, author, guild }, user) {
    const embed = new MayfiEmbed(author)

    const body = await fetch(`https://instagram.com/${user}/?__a=1`).then(res => res.json())
    const res = body.graphql.user

    if(!res.username) {
      embed
        .setTitle("Invalid user")
      return channel.send(embed)
    }

    embed
      .setDescription(res.biography)
    channel.send(embed)

  }
}
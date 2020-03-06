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

    const body = await fetch(`https://instagram.com/${user}/?__a=1`).then(res => res.json()).graphql.user

    if(!body.username) {
      embed
        .setTitle("Invalid user")
      return channel.send(embed)
    }

    embed
      .setDescription(body.biography)
    channel.send(embed)

  }
}
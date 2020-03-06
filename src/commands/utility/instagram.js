const { Command, MayfiEmbed } = require('../../')
const fetch = require("node-fetch")

module.exports = class Instagram extends Command {
  constructor (client) {
    super({
      name: 'instagram',
      category: 'utility',
      parameters: [{
        type: 'string',
        full: false,
        missingError: 'commands:deleteemoji.invalidEmoji'
      }]
    }, client)
  }

  async run ({ t, channel, author, guild }, user) {
    const embed = new MayfiEmbed(author)

    try {
      const body = await fetch(`https://instagram.com/${user}/?__a=1`).then(res => res.json())

      console.log(body)
    } catch(e) {
      console.error(e)
    }

  }
}
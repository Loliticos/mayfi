const { Command, Constants } = require('../../')
const qs = require("querystring")
const fetch = require("node-fetch")

module.exports = class djsDocs extends Command {
  constructor (client) {
    super({
      name: 'djsdocs',
      aliases: ['djs-docs'],
      category: 'utility',
      parameters: [{
        type: 'string', full: true, required: true, missingError: "commands:djsdocs.invalidDocument"
      }]
    }, client)
  }

  async run ({ channel, author, t, message, language}, query) {
        
    const queryString = qs.stringify({ q: query })

    const embed = await fetch(`https://djsdocs.sorta.moe/v2/embed?${queryString}`).then(res => res.json())

    if (!embed) {
      embed
        .setColor(Constants.ERROR_COLOR)
        .setTitle(t("commands:djsdocs.invalidDocument"))
      return channel.send(embed)
    }

      channel.send(embed)
  } 
}

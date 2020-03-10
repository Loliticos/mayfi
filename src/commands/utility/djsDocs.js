const { Command, Constants } = require('../../')
const qs = require("querystring")
const fetch = require("node-fetch")

const SOURCES = ['stable', 'master', 'rpc', 'commando', 'akairo', 'akairo-master', '11.5-dev', 'collection']

module.exports = class djsDocs extends Command {
  constructor (client) {
    super({
      name: 'djsdocs',
      aliases: ['djs-docs'],
      category: 'utility',
      parameters: [{
        type: 'string', full: false, required: true, missingError: "commands:djsdocs.invalidDocument"
      }, {
        type: "string", full: true, required: false
      }]
    }, client)
  }

  async run ({ channel, author, t, message, language}, query, source = "stable") {

    if (!SOURCES.includes(source)) source = "stable"
        
    const queryString = qs.stringify({ src: source, q: query.split(' ').join(" ") })

    const embed = await fetch(`https://djsdocs.sorta.moe/v2/embed?${queryString}`).then(res => res.json())

    console.log(queryString)
    console.log(embed)

    if (!embed) {
      embed
        .setColor(Constants.ERROR_COLOR)
        .setTitle(t("commands:djsdocs.invalidDocument"))
      return channel.send(embed)
    }

      channel.send({embed})
  } 
}

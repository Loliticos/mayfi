const { Command, MayfiEmbed } = require('../../')
const fetch = require("node-fetch")

module.exports = class Translate extends Command {
  constructor (client) {
    super({
      name: 'translate',
      aliases: ['gtranslate', 'traduzir'],
      category: 'utility',
      parameters: [
        {
          type: 'string',
          required: false
        },
        {
          type: 'string',
          required: false
        },
        {
          type: 'string',
          full: true,
          clean: true
        }
      ]
    }, client)
  }

  async run ({ channel, author, t}, from = "pt", to = "en", text) {

    const params = {
      sl: from,
      tl: to,
      q: text
    }

    const URLqueryParams = new URLSearchParams(params)

    const res = await fetch('https://translate.googleapis.com/translate_a/single?client=gtx&dt=t' + `&${URLqueryParams.toString()}`).then(res => res.json())

    const translated = res[0][0][0]
    console.log(res)
    
    let embed = new MayfiEmbed(author)
    .setDescription(translated.length > 2000 ? translated.slice(0, 2000) + '...' : translated)

    channel.send({embed})
        
  }
}

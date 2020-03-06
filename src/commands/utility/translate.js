const { Command, MayfiEmbed, Constants } = require('../../')
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
          full: true,
          clean: true
        }
      ]
    }, client)
  }

  async run ({ channel, author, t}, to, text) {
    const embed = new MayfiEmbed(author)

    try {
      const from = await fetch(`http://api.languagelayer.com/detect?acces_key=${process.env.TRANSLATE_API}&query=${new URLSearchParams(text).toString()}`).then(res => res.json())
      
      console.log(from)

      const params = {
        sl: from.results.language_code,
        tl: to,
        q: text
      }

      const URLqueryParams = new URLSearchParams(params)

      const res = await fetch('https://translate.googleapis.com/translate_a/single?client=gtx&dt=t' + `&${URLqueryParams.toString()}`).then(res => res.json())

      const translated = res[0][0][0]
      
      embed
        .setDescription(translated.length > 2000 ? translated.slice(0, 2000) + '...' : translated)

    } catch(e) {
        embed
          .setColor(Constants.ERROR_COLOR)
          .setTitle(t("commands:translate.invalidLanguage"))
    }

    channel.send(embed)

  }
}

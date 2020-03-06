const { Command, MayfiEmbed, Constants } = require('../../')
const fetch = require("node-fetch")
const DetectLanguage = require('detectlanguage')

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
      const detectLanguage = new DetectLanguage({
        key: process.env.TRANSLATE_API
      })

      detectLanguage.detect(text, (error, result) => {
        if (error) {
          console.error(error)
          embed
            .setColor(Constants.ERROR_COLOR)
            .setTitle(t("commands:translate.invalidLanguage"))
          return channel.send(error)
        }

        const res = JSON.stringify(result)

        const params = {
          sl: res.data.detections.language,
          tl: to,
          q: text
        }

        const URLqueryParams = new URLSearchParams(params)

        const language = await fetch('https://translate.googleapis.com/translate_a/single?client=gtx&dt=t' + `&${URLqueryParams.toString()}`).then(res => res.json())

        const translated = language[0][0][0]
        
        embed
          .setDescription(translated.length > 2000 ? translated.slice(0, 2000) + '...' : translated)
        return channel.send(embed)
      })
  }
}

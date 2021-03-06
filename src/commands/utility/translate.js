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
          clean: true,
          required: true
        }
      ]
    }, client)
  }

  async run ({ channel, author, t}, to, text) {
    const embed = new MayfiEmbed(author)

    const detectLanguage = new DetectLanguage({
      key: process.env.TRANSLATE_API
    })

    detectLanguage.detect(text, async (error, result) => {
      if (error) {
        console.error(error)
        embed
          .setColor(Constants.ERROR_COLOR)
          .setTitle(t("commands:translate.invalidLanguage"))
        return channel.send(error)
      }

      const params = {
        sl: result[0].language,
        tl: to,
        q: text
      }

      const URLqueryParams = new URLSearchParams(params)

      const language = await fetch('https://translate.googleapis.com/translate_a/single?client=gtx&dt=t' + `&${URLqueryParams.toString()}`).then(res => res.json())

      const translated = language[0][0][0]

      const countryNameTO = await fetch(`https://restcountries.eu/rest/v2/alpha/${to.replace("en", "us")}`).then(r => r.json())
      const countryNameFROM = await fetch(`https://restcountries.eu/rest/v2/alpha/${result[0].language.replace("en", "us")}`).then(r => r.json())

      embed
        .setAuthor(t("commands:translate.translated"), "https://lh3.googleusercontent.com/ZrNeuKthBirZN7rrXPN1JmUbaG8ICy3kZSHt-WgSnREsJzo2txzCzjIoChlevMIQEA")
        .addField(`:flag_${to.replace("pt", "br").replace("en", "us")}: ${countryNameTO.name}`, `\`\`\`${translated.length > 2000 ? translated.slice(0, 2000) + '...' : translated}\`\`\``)
        .addField(`:flag_${result[0].language.replace("en", "us").replace("pt", "br")}: ${countryNameFROM.name}`, `\`\`\`${text.length > 200 ? text.slice(0, 2000) + '...' : text}\`\`\``)
      return channel.send(embed)
    })
  }
}

const { Command, MayfiEmbed, Constants } = require('../../')
const qs = require("querystring")
const fetch = require("node-fetch")
const Turndown = require("turndown")

module.exports = class MDN extends Command {
  constructor (client) {
    super({
      name: 'mdn',
      aliases: ['mozilla-developer-network'],
      category: 'utility',
      parameters: [{
        type: 'string', full: true, required: true, missingError: "commands:mdn.invalidDocument"
      }]
    }, client)
  }

  async run ({ channel, author, t, message, language}, query) {
        
    const embed = new MayfiEmbed()

      const queryString = qs.stringify({ q: query })

      const documentToFind = await fetch(`https://mdn.pleb.xyz/search?${queryString}`).then(res => res.json())

      const res = documentToFind.Translations.find(o => o.Locale === language.replace("en-US", "en").replace("fr-FR", "fr").replace("pt-BR", "pt"))

      if (!res) {
        embed
          .setColor(Constants.ERROR_COLOR)
          .setTitle(t("commands:mdn.invalidDocument"))
        return channel.send(embed)
      }

      const summary = res.Summary.replace(/<code><strong>(.+)<\/strong><\/code>/g, '<strong><code>$1</code></strong>')

      const turndown = new Turndown()
        turndown.addRule('hyperlink', {
          filter: 'a',
          replacement: (text, node) => `[${text}](https://developer.mozilla.org${res.URL})`,
      })

      console.log(res)

      embed
        .setAuthor("MDN", "https://developer.mozilla.org/static/img/favicon144.png", 'https://developer.mozilla.org/')
        .setURL(`https://developer.mozilla.org${res.URL}`)
        .setTitle(res.Title)
        .setDescription(turndown.turndown(summary))
      channel.send(embed)

    
    
    
  } 
}

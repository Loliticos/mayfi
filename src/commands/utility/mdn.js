const { Command, MayfiEmbed, Constants } = require('../../')
const qs = require("querystring")
const fetch = require("node-fetch")

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

  async run ({ channel, author, t, message}, query) {
        
    const embed = new MayfiEmbed()

      const queryString = qs.stringify({ q: query })

      const res = await fetch(`https://mdn.pleb.xyz/search?${queryString}`).then(res => res.json())

      if (!res) {
        embed
          .setColor(Constants.ERROR_COLOR)
          .setTitle(t("commands:mdn.invalidDocument"))
        return channel.send(embed)
      }

      console.log(res)

      embed
        .setAuthor("MDN", "https://media.prod.mdn.mozit.cloud/attachments/2013/11/15/6457/5e0f6aa96fb8e4593f143aa803576698/mdn_logo_only_color.pnghttps://media.prod.mdn.mozit.cloud/attachments/2013/11/15/6457/5e0f6aa96fb8e4593f143aa803576698/mdn_logo_only_color.png", 'https://developer.mozilla.org/')
        .setURL(`https://developer.mozilla.org${res.URL}`)
        .setTitle(res.Title)
        .setDescription(res.Summary.replace(/<code><strong>(.+)<\/strong><\/code>/g, '<strong><code>$1</code></strong>'))
      channel.send(embed)

    
    
    
  } 
}

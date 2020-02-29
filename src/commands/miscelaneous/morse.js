const { Command, MayfiEmbed } = require('../../')
const fetch = require("node-fetch")

module.exports = class Morse extends Command {
  constructor (client) {
    super({
      name: 'morse',
      aliases: ['morse-code'],
      category: 'miscelaneous',
      parameters: [{
        type: 'string', full: true, missingError: 'commands:morse.noText', 
      }]
    }, client)
  }

  async run ({ channel, author, t}, text) {
    const embed = new MayfiEmbed(author)

    if(text.includes(".") || text.includes("-")) {
      const morseToEnglish = await fetch(`http://api.funtranslations.com/translate/morse2english.json?text=${encodeURIComponent(text)}`).then(res => res.json())
      embed.setDescription(`❓ ${body.contents.translated}\n ❗ ${body.contents.text}`) 
    } else {
      const body = await fetch(`https://api.funtranslations.com/translate/morse.json?text=${encodeURIComponent(text)}`).then(res => res.json())
        embed.setDescription(`❓ ${body.contents.text}\n ❗ ${body.contents.translated}`)  
    }
    channel.send(embed)
    
  }
}

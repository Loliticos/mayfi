const { Command, MayfiEmbed } = require('../../')
const fetch = require("node-fetch")

module.exports = class Morse extends Command {
  constructor (client) {
    super({
      name: 'morse',
      aliases: ['morse-code', 'translatemorse'],
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
      
      embed
        .setTitle(t("commands:morse.morseToText"))
        .setDescription(morseToEnglish.contents.translated) 

    } else {
      const body = await fetch(`https://api.funtranslations.com/translate/morse.json?text=${encodeURIComponent(text)}`).then(res => res.json())
      embed
        .setTitle(t("commands:morse.textToMorse"))
        .setDescription(body.contents.translated)  
    }

    channel.send({embed})
    
  }
}

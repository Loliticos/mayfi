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
    const body = await fetch(`https://api.funtranslations.com/translate/morse.json?text=${encodeURIComponent(text)}`).then(res => res.json())
    
    console.log(body)
    
    let embed = new MayfiEmbed(author)
      .setDescription(`💻 ${text}\n ${body.translated}`)
    channel.send(embed)
    
  }
}

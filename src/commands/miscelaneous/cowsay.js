const { Command, MayfiEmbed, Constants } = require('../../')
const cowsay = require('cowsay')

module.exports = class Cowsay extends Command {
  constructor (client) {
    super({
      name: 'cowsay',
      aliases: ['muu'],
      category: 'miscelaneous',
      parameters: [{
        type: 'string', clean: true, full: true, missingError: 'commands:cowsay.noText', 
      }]
    }, client)
  }

  async run ({ channel, t, author }, text) {
    channel.send(`\`\`\`${cowsay.say({ text })}\`\`\``)
        
  }
}

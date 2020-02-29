const { Command, MayfiEmbed } = require('../../')

module.exports = class Clapify extends Command {
  constructor (client) {
    super({
      name: 'clapify',
      category: 'miscelaneous',
      parameters: [{
        type: 'string', full: true, maxLength: 120, missingError: 'commands:clapify.noText', 
      }]
    }, client)
  }

  async run ({ channel, t, author }, text) {
    channel.send(new MayfiEmbed(author)
    .setTitle(`👏 ${text.toUpperCase().split(" ").join("👏")} 👏`)
    )

  }
}

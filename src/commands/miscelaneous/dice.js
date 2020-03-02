const { Command, MayfiEmbed } = require('../../')

module.exports = class Dice extends Command {
  constructor (client) {
    super({
      name: 'dice',
      aliases: ['dado', 'rolardado'],
      category: 'miscelaneous',      
      parameters: [{
        type: 'number', full: false, required: false 
      }]

    }, client)
  }

  async run ({ author, channel, t }, defaultNumber = 6) {
    const embed = new MayfiEmbed(author)
    const rolled = (Math.floor(Math.random() * Math.floor(defaultNumber))) + 1

    channel.send(
      embed
        .setTitle(t("commands:dice.rolledOn", { rolled }))
      )

  }
}

const { Command, MayfiEmbed, Constants } = require('../../')
const reverse = require('reverse-string')

module.exports = class Inversetext extends Command {
  constructor (client) {
    super({
      name: 'inversetext',
      aliases: ['reversetext'],
      category: 'miscelaneous',
      parameters: [{
        type: 'string', required: true, missingError: 'commands:inversetext.noText', maxLength: 500
      }]
    }, client)
  }

  async run ({ channel, t, author }, text) {
    const embed = new MayfiEmbed(author)

    try {
      const reversedText = reverse(text)

      embed.setTitle(t("commands:inversetext.heresYourText", { reversedText }))
    } catch(e) {
      embed
        .setColor(Constants.ERROR_COLOR)
        .setTitle(t('errors:generic'))
        .setDescription(`\`${err}\``)
    }

    channel.send(embed)
        
  }
}

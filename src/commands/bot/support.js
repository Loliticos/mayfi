const { Command, MayfiEmbed } = require('../../')

module.exports = class Support extends Command {
  constructor (client) {
    super({
      name: 'support',
      category: 'bot'
    }, client)
  }

  async run ({ t, channel }) {
    channel.send(
      new MayfiEmbed()
        .setDescription(`<:Mayfi_Emoji:676504515020849215> ${t('commands:support.clickHere')}`)
    )
  }
}

const { Command, MayfiEmbed } = require('../../')

module.exports = class Docs extends Command {
  constructor (client) {
    super({
      name: 'docs',
      category: 'bot'
    }, client)
  }

  async run ({ t, channel }) {
    const embed = new MayfiEmbed()
    embed.setThumbnail(this.client.user.displayAvatarURL)
      .setDescription(`**[${t('commands:docs.clickHere')}](https://mayfi.gitbook.io/docs/)**`)
    channel.send(embed)
  }
}

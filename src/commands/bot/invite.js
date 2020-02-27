const { Command, MayfiEmbed } = require('../../')

module.exports = class Invite extends Command {
  constructor (client) {
    super({
      name: 'invite',
      aliases: ['convite'],
      category: 'bot'
    }, client)
  }

  async run ({ t, channel }) {
    const embed = new MayfiEmbed()
    const invite = await this.client.generateInvite()
    embed.setThumbnail(this.client.user.displayAvatarURL)
      .setDescription(`[${t('commands:invite.clickHere')}](${invite})\n${t('commands:invite.noteThat')}`)
    channel.send(embed)
  }
}

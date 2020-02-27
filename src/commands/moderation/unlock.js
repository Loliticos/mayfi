const { Command, Constants, MayfiEmbed } = require('../../')

module.exports = class Unlock extends Command {
  constructor (client) {
    super({
      name: 'unlock',
      aliases: ['destrancar'],
      category: 'moderation',
      requirements: { guildOnly: true, botPermissions: ['MANAGE_CHANNELS'], permissions: ['MANAGE_CHANNELS'] },
      parameters: [{
        type: 'channel', acceptText: true, required: false
      }]
    }, client)
  }

  async run ({ guild, author, t, message }, channel = message.channel) {
    
    const embed = new MayfiEmbed(author)
    await channel.overwritePermissions(guild.id, {
      SEND_MESSAGES: true,
    }).then(() => {
      embed
        .setTitle(t('commands:unlock.successTitle'))
        .setDescription(t('commands:unlock.successDescription', { channel: channel }))
    }).catch(err => {
      embed
        .setColor(Constants.ERROR_COLOR)
        .setTitle(t('commands:unlock.cantLock'))
        .setDescription(`\`${err}\``)
    })
    message.channel.send(embed)
  }
}

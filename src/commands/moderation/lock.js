const { Command, Constants, MayfiEmbed } = require('../../')

module.exports = class Lock extends Command {
  constructor (client) {
    super({
      name: 'lock',
      aliases: ['trancar'],
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
      SEND_MESSAGES: false,
    }).then(() => {
      embed
        .setTitle(t('commands:lock.successTitle'))
        .setDescription(t('commands:lock.successDescription', { channel: channel }))
    }).catch(err => {
      embed
        .setColor(Constants.ERROR_COLOR)
        .setTitle(t('commands:lock.cantLock'))
        .setDescription(`\`${err}\``)
    })
    message.channel.send({embed})
  }
}

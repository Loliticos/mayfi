const { Command, Constants, MayfiEmbed } = require('../../')

module.exports = class Unban extends Command {
  constructor (client) {
    super({
      name: 'unban',
      aliases: ['desban', 'desbanir'],
      category: 'moderation',
      requirements: { guildOnly: true, botPermissions: ['BAN_MEMBERS'], permissions: ['BAN_MEMBERS'] },
      parameters: [{
        type: 'user', acceptBot: true, missingError: 'commands:unban.missingUser'
      }, {
        type: 'string', full: true, missingError: 'commands:unban.missingReason'
      }]
    }, client)
  }

  async run ({ channel, guild, author, t }, user, reason) {
    const embed = new MayfiEmbed(author)
    await guild.unban(user).then(async unbannedMember => {
        embed
          .setTitle(t('commands:unban.successTitle'))
          .setDescription(`${unbannedMember} - \`${reason}\``)
    }).catch(err => {
      embed
        .setColor(Constants.ERROR_COLOR)
        .setTitle(t('commands:unban.cantUnban'))
        .setDescription(`\`${err}\``)
    })
    channel.send(embed)
  }
}

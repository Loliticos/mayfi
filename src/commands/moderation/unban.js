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
      }]
    }, client)
  }

  async run ({ channel, guild, author, t }, user) {
    const embed = new MayfiEmbed(author)
    await guild.unban(user).then(async bannedMember => {
        embed
          .setTitle(t('commands:unban.successTitle'))
          .setDescription(`${softbannedMember} - \`${reason}\``)
    }).catch(err => {
      embed
        .setColor(Constants.ERROR_COLOR)
        .setTitle(t('commands:unban.cantUnban'))
        .setDescription(`\`${err}\``)
    })
    channel.send(embed)
  }
}

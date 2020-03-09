const { Command, Constants, MayfiEmbed } = require('../../')

module.exports = class Softban extends Command {
  constructor (client) {
    super({
      name: 'softban',
      aliases: ['softbanir'],
      category: 'moderation',
      requirements: { guildOnly: true, botPermissions: ['BAN_MEMBERS'], permissions: ['BAN_MEMBERS'] },
      parameters: [{
        type: 'member', acceptBot: true, missingError: 'commands:softban.missingUser'
      }, {
        type: 'string', full: true, missingError: 'commands:softban.missingReason'
      }]
    }, client)
  }

  async run ({ channel, guild, author, t }, member, reason) {
    const informationObject = {
      staffer: author,
      type: "softban",
      user: member,
      reason
    }
    
    const embed = new MayfiEmbed(author)
    await guild.ban(member, { days: 7, reason }).then(async bannedMember => {
      await guild.unban(bannedMember).then(softbannedMember => {
        await this.client.controllers.moderation.sendMessage(guild, t, informationObject)
        embed
          .setTitle(t('commands:softban.successTitle'))
          .setDescription(`${softbannedMember} - \`${reason}\``)
      })
    }).catch(err => {
      embed
        .setColor(Constants.ERROR_COLOR)
        .setTitle(t('commands:softban.cantSoftban'))
        .setDescription(`\`${err}\``)
    })
    channel.send({embed})
  }
}

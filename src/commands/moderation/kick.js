const { Command, MayfiEmbed, Constants } = require('../../')

module.exports = class Kick extends Command {
  constructor (client) {
    super({
      name: 'kick',
      aliases: ['expulsar'],
      category: 'moderation',
      requirements: { guildOnly: true, botPermissions: ['KICK_MEMBERS'], permissions: ['KICK_MEMBERS'] },
      parameters: [{
        type: 'member', acceptBot: true, missingError: 'commands:kick.missingUser'
      }, {
        type: 'string', full: true, missingError: 'commands:kick.missingReason'
      }]
    }, client)
  }

  async run ({ channel, guild, author, t }, member, reason) {
    const informationObject = {
      staffer: author,
      type: "kick",
      member,
      reason
    }

    const embed = new MayfiEmbed(author)
    await member.kick(reason).then(async kickedMember => {
      await this.client.controllers.moderation.sendMessage(guild, t, informationObject)

      embed
        .setTitle(t('commands:kick.successTitle'))
        .setDescription(`${kickedMember} - \`${reason}\``)
    }).catch(err => {
      embed
        .setColor(Constants.ERROR_COLOR)
        .setTitle(t('commands:kick.cantKick'))
        .setDescription(`\`${err}\``)
    })
    channel.send({embed})
  }
}

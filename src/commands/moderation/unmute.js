const { Command, MayfiEmbed, Constants } = require('../../')
const fs = require("fs")

module.exports = class Unmute extends Command {
  constructor (client) {
    super({
      name: 'unmute',
      aliases: ['desmutar'],
      category: 'moderation',
      requirements: { guildOnly: true, botPermissions: ['KICK_MEMBERS'], permissions: ['MANAGE_ROLES'] },
      parameters: [{
        type: 'member', missingError: 'commands:unmute.missingUser'
      }]
    }, client)
  }

  async run ({ channel, guild, author, t }, member) {
    const embed = new MayfiEmbed(author)
    let mutedRole = guild.roles.find(r => r.name == t("commands:unmute.roleName"))

    if(!mutedRole) {
      mutedRole = await guild.createRole({
        name: t("commands:unmute.roleName"),
        color: "#7a7a7a"
      })

      guild.channels.forEach(async (c) => {
        await c.overwritePermissions(mutedRole, {
          SEND_MESSAGES: false,
          ADD_REACTION: false,
          SEND_TTS_MESSAGES: false,
          ATTACH_FILES: false,
          SPEAK: false
        })
      })
    }

    if(!member.roles.has(mutedRole.id)) {
      return channel.send(
        embed
          .setColor(Constants.ERROR_COLOR)
          .setTitle(t("commands:unmute.notMuted"))
      )
    } 

    try {

      delete this.client.mutes[member.id]

      await fs.writeFile("../../../mute.json", JSON.stringify(this.client.mutes), err => {
        if (err) console.error

        member.removeRole(mutedRole.id).then(async user => {
          channel.send(        
            embed
              .setTitle(t("commands:unmute.unmuted"))
              .setDescription(t("commands:unmute.description", { user }))
          )
        }).catch(err => {
          embed
            .setColor(Constants.ERROR_COLOR)
            .setTitle(t('commands:unmute.cantUnmute'))
            .setDescription(`\`${err}\``)
          return channel.send(embed)
        })
      })

    } catch(err) {
        embed
          .setColor(Constants.ERROR_COLOR)
          .setTitle(t('commands:unmute.cantUnmute'))
          .setDescription(`\`${err}\``)
        return channel.send(embed)
    }
  }
}

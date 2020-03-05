const { Command, MayfiEmbed, Constants } = require('../../')
const fs = require("fs")
const ms = require("ms")

module.exports = class Mute extends Command {
  constructor (client) {
    super({
      name: 'mute',
      aliases: ['mutar', 'tempmute', 'silenciar'],
      category: 'moderation',
      requirements: { guildOnly: true, botPermissions: ['KICK_MEMBERS'], permissions: ['MANAGE_ROLES'] },
      parameters: [{
        type: 'member', missingError: 'commands:mute.missingUser'
      }, {
        type: 'time', full: true
      }]
    }, client)
  }

  async run ({ channel, guild, author, t }, member, time) {
    const embed = new MayfiEmbed(author)
    let mutedRole = guild.roles.find(r => r.name == t("commands:mute.roleName"))

    if(!mutedRole) {
      mutedRole = await guild.createRole({
        name: t("commands:mute.roleName"),
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

    if(member.roles.has(mutedRole.id)) {
      return channel.send(
        embed
          .setColor(Constants.ERROR_COLOR)
          .setTitle(t("commands:mute.alreadyMuted"))
      )
    } 

    try {
      this.client.mutes[member.id] = {
        id: member.id,
        time: Date.now() + time,
        guild: guild.id
      }

      fs.writeFile("../../../mute.json", JSON.stringify(this.client.mutes, null, 4), err => {
        if (err) console.error

        member.addRole(mutedRole.id).then(async user => {
          channel.send(        
            embed
              .setTitle(t("commands:mute.muted"))
              .setDescription(t("commands:mute.description", { user, time: ms(time) }))
          )
        }).catch(err => {
          embed
            .setColor(Constants.ERROR_COLOR)
            .setTitle(t('commands:mute.cantMute'))
            .setDescription(`\`${err}\``)
          return channel.send({embed})
        })
      })

    } catch(err) {
        embed
          .setColor(Constants.ERROR_COLOR)
          .setTitle(t('commands:mute.cantMute'))
          .setDescription(`\`${err}\``)
        return channel.send({embed})
    }
  }
}

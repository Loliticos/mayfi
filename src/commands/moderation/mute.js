const { Command, MayfiEmbed, Constants } = require('../../')
const fs = require("fs")

module.exports = class Mute extends Command {
  constructor (client) {
    super({
      name: 'mute',
      aliases: ['mutar', 'tempmute', 'silenciar'],
      category: 'moderation',
      requirements: { guildOnly: true, botPermissions: ['KICK_MEMBERS'], permissions: ['KICK_MEMBERS'] },
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
      mutedRole = await message.guild.createRole({
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
          .setTitle(t("commands:mute.cantMute")
          .setDescription(t("commands:mute.alreadyMuted"))
      )
    } 

    try {
      this.client.mutes[member.id] = {
        id: member.id,
        time: Date.now() + time,
        guild: guild.id
      }

      await fs.writeFile("../../../mute.json", JSON.stringify(this.client.mutes, null, 4))

      member.addRole(muteRole.id).then(async user => {
        channel.send(        
          embed
            .setTitle(t("commands:mute.muted"))
            .setDescription(t("commands:mute.description", { user, time }))
        )
      }).catch(err => {
        embed
          .setColor(Constants.ERROR_COLOR)
          .setTitle(t('commands:mute.cantMute'))
          .setDescription(`\`${err}\``)
      })

      channel.send(embed)
    }
  }
}

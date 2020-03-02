const { Command, MayfiEmbed, Permissions } = require('../../')
const moment = require("moment")

module.exports = class BotInfo extends Command {
  constructor (client) {
    super({
      name: 'botinfo',
      aliases: ['bi', 'binfo'],
      category: 'bot'
    }, client)
  }

  run ({ channel, author, t, language}) {
    const uptime = moment.duration(this.client.uptime).format("D [d], H [h], m [m], s [s]")
    channel.send(
      new MayfiEmbed(author)
        .setAuthor(this.client.user.username, this.client.user.displayAvatarURL)
        .setThumbnail(this.client.user.displayAvatarURL)
        .setDescription([
          t('commands:botinfo.hello', { user: author }),
          t('commands:botinfo.statistics', { guilds: this.client.guilds.size, commands: this.client.commands.size,  users: this.client.users.filter(u => !u.bot).size, uptime })
        ].join('\n\n'))
        .addField(t('commands:botinfo.supportServer'), t('commands:botinfo.supportLink'))
        .addField(t('commands:botinfo.inviteMe'), t('commands:botinfo.inviteLink'))
        .addField(t('commands:botinfo.docs'), t('commands:botinfo.docsLink'))
        .addField(t('commands:botinfo.specialThanks'), Permissions.getManagers(this.client).join(", "))
    )
  }
}

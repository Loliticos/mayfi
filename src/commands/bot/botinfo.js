const { Command, MayfiEmbed } = require('../../')
const Discord = require('discord.js')
const moment = require('moment')

module.exports = class BotInfo extends Command {
  constructor (client) {
    super({
      name: 'botinfo',
      aliases: ['bi', 'binfo'],
      category: 'bot'
    }, client)
  }

  run ({ channel, author, t, language}) {
    moment.locale(language)
    const uptime = moment.duration(process.uptime() * 1000).format('d[d] h[h] m[m] s[s]')
    channel.send(
      new MayfiEmbed(author)
        .setAuthor(this.client.user.username, this.client.user.displayAvatarURL)
        .setThumbnail(this.client.user.displayAvatarURL)
        .setDescription([
          t('commands:botinfo.hello', { user: author }),
          t('commands:botinfo.statistics', { guilds: this.client.guilds.size, commands: this.client.commands.length,  users: this.client.users.filter(u => !u.bot).size, uptime })
        ].join('\n\n'))
        .addField(t('commands:botinfo.supportServer'), t('commands:botinfo.supportLink'))
        .addField(t('commands:botinfo.inviteMe'), t('commands:botinfo.inviteLink'))
    )
  }
}

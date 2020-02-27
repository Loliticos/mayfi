const { Command, MayfiEmbed } = require('../../')
let moment = require("moment")

module.exports = class Serverinfo extends Command {
  constructor (client) {
    super({
      name: 'serverinfo',
      aliases: ['si', 'guildinfo'],
      category: 'utility',
      parameters: [{
        type: 'guild', full: true, required: false
      }]
    }, client)
  }

  async run ({ channel, t, language, author }, guild = channel.guild) {

      moment.locale(language)

      let embed = new MayfiEmbed(author)
      .setAuthor(guild.name, guild.iconURL)
      .addField("ID", guild.id, true)
      .addField(t("commands:guildinfo.owner"), `${guild.owner.member ? guild.owner.member + "**-**" + guild.owner.username : t("commands:guildinfo.invalidOwner")}`, true)
      .addField(t("commands:guildinfo.region"), t(`regions:${guild.region}`))
      .addField(t("commands:guildinfo.channels"), guild.channels.size)
      .addField(t("commands:guildinfo.roles"), guild.roles.size)
      .addField(t("commands:guildinfo.joinedAt"), `${moment(guild.joinedTimestamp).format('LLL')}\n(${moment(guild.joinedTimestamp).fromNow()})`, true)
      .addField(t("commands:guildinfo.createdAt"), `${moment(guild.createdAt).format('LLL')}\n(${moment(guild.createdAt).fromNow()})`, true)   
      .addField(t('commands:guildinfo.members', { count: guild.members.size }), [
        `${Constants.streaming} ${t('commands:guildinfo.streaming', { count: guild.members.filter(m => m.game === 'streaming').size })}`,
        `${Constants.online} Online: ${guild.members.filter(m => m.presence.status === 'online').size}`,
        `${Constants.idle} ${t('commands:guildinfo.idle', { count: guild.members.filter(m => m.presence.status === 'idle').size })}`,
        `${Constants.dnd} ${t('commands:guildinfo.dnd', { count: guild.members.filter(m => m.presence.status === 'dnd').size })}`,
        `${Constants.offline} Offline: ${guild.members.filter(m => m.presence.status === 'offline').size}\n`,
        t('commands:guildinfo.users', { count: guild.members.filter(m => !m.user.bot).size }),
        t('commands:guildinfo.bots', { count: guild.members.filter(m => m.user.bot).size })
      ].join('\n'))       
      .setThumbnail(guild.iconURL)

      channel.send(embed)
        
  }
}

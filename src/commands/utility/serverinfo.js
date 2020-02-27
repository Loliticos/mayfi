const { Command, MayfiEmbed, MiscUtils } = require('../../')
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
      .addField(t('commands:guildinfo.members', { count: MiscUtils.formatNumber(guild.members.size, language) }), [
        `${Constants.streaming} ${t('commands:guildinfo.streaming', { count: MiscUtils.formatNumber(guild.members.filter(m => m.game === 'streaming').size, language) })}`,
        `${Constants.online} Online: ${MiscUtils.formatNumber(guild.members.filter(m => m.presence.status === 'online').size, language) }`,
        `${Constants.idle} ${t('commands:guildinfo.idle', { count: MiscUtils.formatNumber(guild.members.filter(m => m.presence.status === 'idle').size, language) })}`,
        `${Constants.dnd} ${t('commands:guildinfo.dnd', { count: MiscUtils.formatNumber(guild.members.filter(m => m.presence.status === 'dnd').size, language) })}`,
        `${Constants.offline} Offline: ${MiscUtils.formatNumber(guild.members.filter(m => m.presence.status === 'offline').size, language)}\n`,
        t('commands:guildinfo.users', { count: MiscUtils.formatNumber(guild.members.filter(m => !m.user.bot).size, language) }),
        t('commands:guildinfo.bots', { count: MiscUtils.formatNumber(guild.members.filter(m => m.user.bot).size, language) })
      ].join('\n'))       
      .setThumbnail(guild.iconURL)

      channel.send(embed)
        
  }
}

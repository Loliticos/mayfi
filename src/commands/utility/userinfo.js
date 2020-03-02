const { Command, MayfiEmbed, Constants } = require('../../')
let moment = require("moment")

module.exports = class Userinfo extends Command {
  constructor (client) {
    super({
      name: 'userinfo',
      aliases: ['ui'],
      category: 'utility',
      parameters: [{
        type: 'user', full: true, required: false, acceptBot: true
      }]
    }, client)
  }

  async run ({ channel, member: author, t, language, guild }, user = author) {

      moment.locale(language)

      const UserData = await this.client.database.users.findOne({_id: user.id})
      const member = guild.members.get(user.id)

      let embed = new MayfiEmbed(user)
      .setAuthor(user.displayName, user.displayAvatarURL)
      .addField("ID", user.id, true)
      .addField("Tag", user.tag, true)
      .addField("Status", t(`commands:userinfo.${user.presence.status}`, { status: Constants[user.presence.status] }))
      .addField(t("commands:userinfo.playing"), user.presence.game ? user.presence.game : t("commands:userinfo.notPlaying"))
      .addField(t("commands:userinfo.createdAt"), `${moment(user.createdTimestamp).format('LLL')}\n(${moment(user.createdTimestamp).fromNow()})`)
      .addField(t("commands:userinfo.joinedAt"), `${moment(member.joinedTimestamp).format('LLL')}\n(${moment(member.joinedTimestamp).fromNow()})`)     
      UserData ? embed.addField(t("commands:userinfo.aboutMe"), UserData.personalText) : " "
      embed.setThumbnail(user.displayAvatarURL)

      channel.send(embed)
        
  }
}

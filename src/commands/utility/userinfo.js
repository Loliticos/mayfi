const { Command, MayfiEmbed, Constants } = require('../../')
let moment = require("moment")

module.exports = class Userinfo extends Command {
  constructor (client) {
    super({
      name: 'userinfo',
      aliases: ['ui'],
      category: 'utility',
      parameters: [{
        type: 'member', full: true, required: false, acceptBot: true
      }]
    }, client)
  }

  async run ({ channel, member: author, t, language }, member = author) {

      moment.locale(language)

      const UserData = await this.client.database.users.findOne({_id: member.user.id})

      let embed = new MayfiEmbed(member.user)
      .setAuthor(member.displayName, member.user.displayAvatarURL)
      .addField("ID", member.user.id, true)
      .addField("Tag", member.user.tag, true)
      .addField("Status", t(`commands:userinfo.${member.presence.status}`, { status: Constants[member.presence.status] }))
      .addField(t("commands:userinfo.playing"), member.user.presence.game ? member.user.presence.game : t("commands:userinfo.notPlaying"))
      .addField(t("commands:userinfo.createdAt"), `${moment(member.user.createdTimestamp).format('LLL')}\n(${moment(member.user.createdTimestamp).fromNow()})`)
      .addField(t("commands:userinfo.joinedAt"), `${moment(member.joinedTimestamp).format('LLL')}\n(${moment(member.joinedTimestamp).fromNow()})`)     
      UserData ? embed.addField(t("commands:userinfo.aboutMe"), UserData.personalText) : ""
      embed.setThumbnail(member.user.displayAvatarURL)

      channel.send(embed)
        
  }
}

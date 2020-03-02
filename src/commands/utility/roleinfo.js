const { Command, MayfiEmbed, Constants } = require('../../')
let moment = require("moment")

module.exports = class RoleInfo extends Command {
  constructor (client) {
    super({
      name: 'roleinfo',
      aliases: ['ri'],
      category: 'utility',
      parameters: [{
        type: 'role', required: true, missingError: 'errors:invalidRole'
      }]
    }, client)
  }

  async run ({ channel, t, language, author }, role) {

      moment.locale(language)

      let embed = new MayfiEmbed(author)
      .setDescription(role)
      .addField("ID", role.id, true)
      .addField(t("commands:roleinfo.name"), role.name, true)
      .addField(t("commands:roleinfo.color"), role.hexColor)
      .addField(t("commands:roleinfo.createdAt"), `${moment(role.createdAt).format('LLL')}\n(${moment(role.createdAt).fromNow()})`, true)
      .addField(t("commands:roleinfo.mentionable"), role.mentionable ? t("commands:roleinfo.mentionableTrue") : t("commands:roleinfo.mentionableFalse"))     
      .addField(t("commands:roleinfo.members"), role.members.size)
      .addField(t("commands:roleinfo.position"), role.position)
      .setThumbnail(`http://www.singlecolorimage.com/get/${role.hexColor.replace("#", "")}/100x100`)

      channel.send(embed)
        
  }
}

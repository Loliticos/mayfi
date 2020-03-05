const { Command, MayfiEmbed, Constants } = require('../../')

module.exports = class Warn extends Command {
  constructor (client) {
    super({
      name: 'warn',
      aliases: ['avisar'],
      category: 'moderation',
      cooldown: 3,
      requirements: { guildOnly: true, botPermissions: ['KICK_MEMBERS'], permissions: ['KICK_MEMBERS'] },
      parameters: [{
        type: 'member', required: true, acceptSelf: false, missingError: "commands:warn.noMember"
      }, {
        type: 'string', required: false, full: true
      }]
    }, client)
  }

  async run ({ channel, author, t }, member, reason) {
    const embed = new MayfiEmbed(author)

    try {
      await this.client.database.users.updateOne({_id: member.user.id}, { $inc: { warns: 1 } })

      embed
        .setTitle(t("commands:warn.warned"))
        .setDescription(`${member} ${reason ? "-" + " " + reason : ""}`)
    } catch (e) {
      embed
        .setColor(Constants.ERROR_COLOR)
        .setTitle(t("commands:warn.cantWarn"))
        .setDescription(`\`${e}\``)
    }

    channel.send({embed})

  }
}

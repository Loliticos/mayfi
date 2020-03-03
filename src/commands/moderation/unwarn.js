const { Command, MayfiEmbed, Constants } = require('../../')

module.exports = class Unwarn extends Command {
  constructor (client) {
    super({
      name: 'unwarn',
      aliases: ['desavisar'],
      category: 'moderation',
      cooldown: 10,
      requirements: { guildOnly: true, botPermissions: ['KICK_MEMBERS'], permissions: ['KICK_MEMBERS'] },
      parameters: [{
        type: 'member', required: true, acceptSelf: false, missingError: "commands:unwarn.noMember"
      }, {
        type: 'string', required: false, full: true
      }]
    }, client)
  }

  async run ({ channel, author, t }, member, reason) {
    const embed = new MayfiEmbed(author)

    const { warns } = await this.client.database.users.findOne({_id: member.user.id})

    if (warns <= 0) {
      embed
        .setColor(Constants.ERROR_COLOR)
        .setTitle(t("commands:unwarn.cantUnwarn"))
        .setDescription(t("commands:unwarn.memberHasNoWarning"))
      return channel.send(embed)
    }

    try {
      await this.client.database.users.updateOne({_id: member.user.id}, { $inc: { warns: -1 } })

      embed
        .setTitle(t("commands:unwarn.unwarned"))
        .setDescription(`${member} ${reason ? "-" + " " + reason : ""}`)
    } catch (e) {
      embed
        .setColor(Constants.ERROR_COLOR)
        .setTitle(t("commands:unwarn.cantUnwarn"))
        .setDescription(`\`${e.message}\``)
    }

    channel.send(embed)

  }
}

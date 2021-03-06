const { Controller, MayfiEmbed } = require('../')
const ms = require("ms")

module.exports = class ModerationController extends Controller {
  constructor (client) {
    super({
      name: "moderation"
    }, client)
  }

  get _guilds () {
    return this.client.database.guilds
  }

  async disableSystem (_guild) {
    const guild = await this._guilds.findOne({_id: _guild.id})

    if (guild.moderationChannel === "false") throw new Error("ALREADY_DISABLED")

    await this._guilds.updateOne({_id: _guild.id}, { moderationChannel: "false" })
  }

  async setSystemChannel (guild, channel) {
    await this._guilds.updateOne({_id: guild.id}, { moderationChannel: channel.id })
  }


  async sendMessage(_guild, t, informationObject = {}) {
    const guild = await this._guilds.findOne({_id: _guild.id})

    if (guild.moderationChannel === "false") return

    const channel = this.client.channels.get(guild.moderationChannel)

    if (!channel) return

    const embed = new MayfiEmbed(informationObject.staffer)

    embed
      .setTitle(informationObject.member.user.tag + " " + "-" + " " +  t(`commons:moderation.types.${informationObject.type}`))
      .addField("ID", informationObject.member.id)
      informationObject.staffer ? embed.addField(t("commons:moderation.messages.punnedByUser"), informationObject.staffer.tag) : ""
    embed
      .setThumbnail(informationObject.staffer.displayAvatarURL)
      .addField(t("commons:moderation.messages.reason"), informationObject.reason ? informationObject.reason : t("commons:moderation.messages.noReason"))

    if (informationObject.type === "mute") embed.addField(t("commons:moderation.messages.time"), ms(informationObject.time))

    channel.send(embed)

  }
}

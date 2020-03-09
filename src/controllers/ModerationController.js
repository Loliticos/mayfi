const { Controller, MayfiEmbed } = require('../')

module.exports = class ModerationController extends Controller {
  constructor (client) {
    super({
      name: "moderation"
    }, client)
  }

  get _guilds () {
    return this.client.database.guilds
  }

  async checkModerationChannel (_guild) {
    const guild = await this._guilds.findOne({_id: _guild.id})

    return guild.moderationChannel === "false" ? true : false
  }

  async disableSystem (_guild) {
    if (this.checkModerationChannel(_guild)) throw new Error("ALREADY_DISABLED")

    await this._guilds.updateOne({_id: _guild.id}, { moderationChannel: "false" })
  }

  async setSystemChannel (guild, channel) {
    await this._guilds.updateOne({_id: guild.id}, { moderationChannel: channel.id })
  }


  async sendMessage(_guild, t, informationObject = {}) {
    if (this.checkModerationChannel(_guild)) return

    const guild = this._guilds.findOne({_id: _guild.id})

    const channel = this.client.guilds.get(guild.moderationChannel)

    if (!channel) return

    const embed = new MayfiEmbed(informationObject.staffer)

    console.log(informationObject)

    embed
      .setTitle(informationObject.user.tag +  "-" + t(`commons:moderation.types.${informationObject.type}`))
      informationObject.staffer ? embed.addField(t("commons:moderation.messages.punnedByUser"), informationObject.staffer.tag) : ""
    embed
      .setThumbnail(informationObject.staffer.displayAvatarURL)
      .addField(t("commons:moderation.messages.reason"), informationObject.reason ? informationObject.reason : t("commons:moderation.messages.noReason"))


    if(informationObject.type === "mute") embed.addField(t("commons:moderation.messages.time"), informationObject.time)

    channel.send(embed)

  }
}

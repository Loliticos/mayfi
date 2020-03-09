const { Command, Constants, MayfiEmbed } = require('../../../')

module.exports = class ChannelModeration extends Command {
  constructor (client) {
    super({
      name: 'channel',
      aliases: ['canal', 'setcanal'],
      category: 'config',
      parent: "moderation",
      parameters: [{
        type: 'channel', 
        acceptText: true,
        required: true
      }]
    }, client)
  }

  async run ({ author, t, message, guild }, channel) {
    const embed = new MayfiEmbed(author)

    await this.client.controllers.moderation.setSystemChannel(guild, channel)

    embed
      .setTitle(t(`commands:${this.path}.enabledModerationSystem`))
      .setDescription(t(`commands:${this.path}.channel`, { channel }))

    message.channel.send({embed})


  }
}

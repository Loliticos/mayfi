const { Command, Constants, MayfiEmbed } = require('../../')

module.exports = class LogsChannel extends Command {
  constructor (client) {
    super({
      name: 'channel',
      aliases: ['canal', 'setcanal'],
      category: 'config',
      parent: 'logs',
      parameters: [{
        type: 'channel', 
        acceptText: true
        required: true
      }]
    }, client)
  }

  async run ({ author, t, message, guild }, channel) {
    const embed = new MayfiEmbed(author)

    try {
      await this.client.database.guilds.updateOne({ _id: guild.id }, { logsChannel: channel.id })

      embed
        .setTitle(t(`commands:${this.path}.enabledLogsSystem`))
        .setDescription(t(`commands:${this.path}.channel`, { channel }))
    } catch (e) {
      embed.setColor(Constants.ERROR_COLOR)
        .setTitle(t('errors:generic'))
    }

    message.channel.send({embed})


  }
}

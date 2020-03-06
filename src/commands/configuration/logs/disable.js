const { Command, Constants, MayfiEmbed } = require('../../../')

module.exports = class DisableLogs extends Command {
  constructor (client) {
    super({
      name: 'disable',
      aliases: ['desabilitar', 'off', 'false'],
      category: 'config',
      parent: 'logs'
    }, client)
  }

  async run ({ author, t, channel, guild }) {
    const embed = new MayfiEmbed(author)

    const guildData = await this.client.database.guilds.findOne({_id: guild.id})

    if(guildData.logsChannel == "false") {
      return channel.send(
        embed
          .setColor(Constants.ERROR_COLOR)
          .setTitle(t("logsAlreadyDisabled"))
      )
    }

    try {
      await this.client.database.guilds.updateOne({ _id: guild.id }, { logsChannel: "false" })

      embed
        .setTitle(t(`commands:${this.path}.disabledLogsSystem`))
    } catch (e) {
      embed
        .setColor(Constants.ERROR_COLOR)
        .setTitle(t('errors:generic'))
    }

    channel.send({embed})


  }
}

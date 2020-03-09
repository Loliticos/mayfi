const { Command, Constants, MayfiEmbed } = require('../../../')

module.exports = class DisableChannel extends Command {
  constructor (client) {
    super({
      name: 'disable',
      aliases: ['desabilitar', 'off', 'false'],
      category: 'config',
      parent: 'moderation'
    }, client)
  }

  async run ({ author, t, channel, guild }) {
    const embed = new MayfiEmbed(author)

    try {
      await this.client.controllers.moderation.disableSystem(guild)

      embed
        .setTitle(t(`commands:${this.path}.disabledModerationSystem`))
    } catch (e) {
      switch (e.message) {
        case "ALREADY_DISABLED":
          embed
            .setColor(Constants.ERROR_COLOR)
            .setTitle(t(`commands:${this.path}.alreadyDisabled`))
        default:
          embed
            .setColor(Constants.ERROR_COLOR)
            .setTitle(t("errors:generic"))
      }
    }

    channel.send(embed)

  }
}

const { Command, MayfiEmbed, Constants } = require('../../')

module.exports = class Unblacklist extends Command {
  constructor (client) {
    super({
      name: 'unblacklist',
      category: 'developers',
      hidden: true,
      requirements: { onlyDevs: true, databaseOnly: true },
      parameters: [{
        type: 'user', showUsage: false, missingError: 'commands:unblacklist.missingUser'
      }]
    }, client)
  }

  async run ({ channel, author, t }, user) {
    const embed = new MayfiEmbed(author)

    try {
      await this.client.controllers.dev.unblacklist(user)

      embed
        .setDescription(t('commands:unblacklist.success', { user }))
    } catch (e) {
      switch (e.message) {
        case "USER_NOT_BLACKLISTED":
        embed
          .setDescription(t('commands:unblacklist.notBlacklisted'))
          .setColor(Constants.ERROR_COLOR)
        default:
          embed
            .setTitle(t("errors:generic"))
            .setColor(Constants.ERROR_COLOR)
      }
    }

    channel.send(embed)
  }
}

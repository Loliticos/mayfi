const { Command, MayfiEmbed, Constants } = require('../../')

module.exports = class BlacklistCommand extends Command {
  constructor (client) {
    super({
      name: 'blacklist',
      category: 'developers',
      hidden: true,
      requirements: { onlyDevs: true, databaseOnly: true },
      parameters: [{
        type: 'user', acceptDeveloper: false, missingError: 'commands:blacklist.missingUser'
      }, {
        type: 'string', full: true, missingError: 'commands:blacklist.missingReason'
      }]
    }, client)
  }

  async run ({ channel, author, t }, user, reason) {
    const embed = new MayfiEmbed(author)

    try {
      await this.client.controllers.dev.blacklist(user)

      embed
        .setTitle(t('commands:blacklist.successTitle'))
        .setDescription(`${user} - \`${reason}\``)
    } catch (e) {
      switch (e.message) {
        case "USER_ALREADY_BLACKLISTED":
          embed
            .setTitle(t("commands:blacklist.userAlreadyBlacklisted"))
        default:
          console.error(e)
          embed
            .setColor(Constants.ERROR_COLOR)
            .setTitle(t("errors:generic"))
      }
    }

    channel.send({embed})
  }
}
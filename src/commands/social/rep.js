const { Command, MayfiEmbed, Constants } = require('../../')
const moment = require("moment")

module.exports = class Rep extends Command {
  constructor (client) {
    super({
      name: 'rep',
      aliases: ['reputation'],
      category: 'social',
      requirements: { databaseOnly: true },
      parameters: [{
        type: 'user', 
        acceptBot: false, 
        acceptSelf: false,
        missingError: 'errors:invalidUser',
        errors: { acceptSelf: 'commands:rep.repYourself' }
      }]
    }, client)
  }

  async run ({ channel, guild, author, t }, user) {
    const embed = new MayfiEmbed(author)

    try {
      await this.client.controllers.social.rep(author, user)

      embed
        .setDescription(t('commands:rep.repSuccess', { user }))
    } catch(e) {
      switch (e.message) {
        case "ALREADY_REP":
          embed
            .setColor(Constants.ERROR_COLOR)
            .setTitle(t("commands:rep.alreadyGave"))
            .setDescription(t("commands:rep.youCanGiveAgain", { cooldown: e.formattedCooldown }))
        default:
          embed
            .setColor(Constants)
            .setTitle(t("errors:generic"))
      }
    }

    channel.send(embed)
  }
}

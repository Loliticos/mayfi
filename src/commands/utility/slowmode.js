const { Command, Constants, MayfiEmbed } = require('../../')

module.exports = class Slowmode extends Command {
  constructor (client) {
    super({
      name: 'slowmode',
      aliases: ['ratelimit'],
      category: 'utility',
      requirements: { guildOnly: true, permissions: ['MANAGE_CHANNELS'], botPermissions: ['MANAGE_CHANNELS'] },
      parameters: [{
        type: 'number',
        full: false,
        missingError: 'commands:slowmode.noTime'
      }, {
        type: 'channel',
        acceptText: true,
        required: false
      }]
    }, client)
  }

  async run ({ t, message, author, guild }, number, channel = message.channel) {
    const embed = new MayfiEmbed(author)

    await channel.setRateLimitPerUser(number).then(() => {
      embed
        .setDescription(t("commands:slowmode.changed", { number, channel }))
    }).catch(err => {
      embed
        .setColor(Constants.ERROR_COLOR)
        .setTitle(t('commands:slowmode.cantChange'))
        .setDescription(`\`${err}\``)
    })

    message.channel.send(embed)
  }
}
const { Command, MayfiEmbed } = require('../../')

module.exports = class BlacklistCommand extends Command {
  constructor (client) {
    super({
      name: 'blacklist',
      category: 'developers',
      hidden: true,
      requirements: { devOnly: true },
      parameters: [{
        type: 'user', acceptDeveloper: false, missingError: 'commands:blacklist.missingUser'
      }, {
        type: 'string', full: true, missingError: 'commands:blacklist.missingReason'
      }]
    }, client)
  }

  async run ({ channel, author, t }, user, reason) {
    const embed = new MayfiEmbed(author)
    await this.client.database.users.updateOne({ _id: user.id }, { blacklisted: { reason, author } })
    embed
      .setTitle(t('commands:blacklist.successTitle'))
      .setDescription(`${user} - \`${reason}\``)
    channel.send(embed)
  }
}
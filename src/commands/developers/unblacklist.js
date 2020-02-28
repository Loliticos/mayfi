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
    const userDocument = await this.client.database.users.findOne({_id: user.id})
    
    console.log(userDocument)
    if(!userDocument.blacklisted) {
      embed.setDescription(t('commands:unblacklist.notBlacklisted'))
      .setColor(Constants.ERROR_COLOR)
      return channel.send(embed)  
    }
    await this.client.database.users.updateOne({_id: user.id}, { blacklisted: false })
    embed.setDescription(`**${t('commands:unblacklist.success', { user })}**`)
    channel.send(embed)
  }
}

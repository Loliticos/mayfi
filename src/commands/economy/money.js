const { Command, MayfiEmbed, CommandError } = require('../../')

module.exports = class Money extends Command {
  constructor (client) {
    super({
      name: 'money',
      aliases: ['coin', 'coins'],
      category: 'economy',
      cooldown: 3,
      requirements: { databaseOnly: true, },
      parameters: [{
        type: 'user', 
        acceptBot: false, 
        acceptSelf: true,
        required: false
      }]
    }, client)
  }

  async run ({ channel, guild, author, t }, user = author) {
    const embed = new MayfiEmbed(author)

    try {
      let userData = await this.client.database.users.findOne({_id: user.id})

      embed
        .setTitle(t("commands:money.title"))
        .setDescription(t("commands:money.howMany", { coins: userData.money, user }))
 
      channel.send(embed)
    } catch(err) {
      throw new CommandError(t("errors:generic"))
    }
  }
}

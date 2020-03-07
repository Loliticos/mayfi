const { Command, MayfiEmbed, CommandError } = require('../../')

module.exports = class Balance extends Command {
  constructor (client) {
    super({
      name: 'balance',
      aliases: ['money', 'coin', 'coins', 'gems', 'gem'],
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
        .setTitle(t("commands:balance.title"))
        .setDescription(t("commands:balance.balanceDescription", { userData, user }))
 
      channel.send({embed})
    } catch(err) {
      throw new CommandError(t("errors:generic"))
    }
  }
}

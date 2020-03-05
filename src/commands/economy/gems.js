const { Command, MayfiEmbed, CommandError } = require('../../')

module.exports = class Gems extends Command {
  constructor (client) {
    super({
      name: 'gems',
      aliases: ['gemas', 'gem'],
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
      let UserData = await this.client.database.users.findOne({_id: user.id})

      embed
        .setTitle(t("commands:gems.title"))
        .setDescription(t("commands:gems.howMany", { gems: UserData.gems, user }))
 
      channel.send({embed})
    } catch(err) {
      throw new CommandError(t("errors:generic"))
    }
  }
}

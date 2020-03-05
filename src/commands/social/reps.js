const { Command, MayfiEmbed, CommandError } = require('../../')

module.exports = class Reps extends Command {
  constructor (client) {
    super({
      name: 'reps',
      aliases: ['reputations'],
      category: 'social',
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

      if(!UserData) {
          const newUser = new this.client.database.users({
            _id: user.id
          })

          newUser.save()

          UserData.reps = "0"
      }

      embed
        .setTitle(t("commands:reps.title"))
        .setDescription(t("commands:reps.howMany", { reps: UserData.reps, user, pointPoints: UserData.reps > 1 ? "points" : "point" }))
 
      channel.send({embed})
    } catch(err) {
      throw new CommandError(t("errors:generic"))
    }
  }
}
